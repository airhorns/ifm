module Mutations
  class ResourceAndChildrenMutation < Mutations::BaseMutation
    def resolve(input:)
      input = input.to_h
      farm = context[:current_farm]
      root_object = self.root_object(input, farm)
      apply_root_attributes(input, root_object)
      apply_child_attributes(input, root_object)

      if root_object.errors.empty? && root_object.save
        {
          root_object_name.to_sym => root_object,
          errors: []
        }
      else
        {
          root_object_name.to_sym => nil,
          errors: root_object.errors.full_messages
        }
      end
    end

    def root_object_name
      @root_object_name ||= self.class.fields.keys.detect { |key| key != "errors" }
    end

    def root_object_class
      @root_object_class ||= root_object_name.titleize.constantize
    end

    def root_object(_input, farm)
      root_object_class.where(farm_id: farm.id).find(intput.id)
    end

    def mutatable_associations
      []
    end

    def child_input_keys
      mutatable_associations.flat_map { |key| [:"update_#{key}", :"create_#{key}", :"delete_#{key}"] }
    end

    def apply_root_attributes(input, root_object)
      root_keys = ((input.keys - child_input_keys) - [:id])
      root_object.assign_attributes(input.slice(*root_keys))
    end

    def apply_child_attributes(input, root_object)
      mutatable_associations.each do |association_name|
        # association = object.association(association_name)
        association_proxy = root_object.send(association_name)
        existing_records = association_proxy.index_by { |record| record.id.to_s }

        # update existing associations, will be saved because autosave: true on the association
        input[:"update_#{association_name}"]&.each do |update_child_input|
          if child_object = existing_records[update_child_input.fetch(:id)]
            child_object.assign_attributes(update_child_input)
          else
            root_object.errors.add(:farm_zones, "Couldn't find child record with ID=#{update_child_input[:id]} to update")
          end
        end

        # create new associations, will be saved when root is saved because autosave: true on the association
        input[:"create_#{association_name}"]&.each do |create_child_input|
          association_proxy.build(create_child_input)
        end

        # delete associations, will be destroyed when root is saved because autosave: true on the association
        input[:"delete_#{association_name}".to_sym]&.each do |delete_child_input|
          if child_object = existing_records[delete_child_input.fetch(:id)]
            child_object.mark_for_destruction
          else
            root_object.errors.add(:farm_zones, "Couldn't find child record with ID=#{delete_child_input[:id]} to update")
          end
        end
      end
    end
  end
end
