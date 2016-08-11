export default function simpleSchemaValidator(collection, field, value) {
	const context = collection.simpleSchema().namedContext();
	context.validateOne({ [field]: value }, field, { modifier: false });
	return context.keyErrorMessage(field)
}
