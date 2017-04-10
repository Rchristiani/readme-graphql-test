const graphql = require('graphql');
const mongoose = require('mongoose');

//First define mongoose scheme
const Schema = mongoose.Schema;

const model = Object.assign({
	title: String,
	body: String,
	description: String,
	category: String,
	time: Number
});

const topicSchema = new Schema(model);

const Topics = mongoose.model('Topic', topicSchema);

//Then defined grahpql Type
const TopicsType = new graphql.GraphQLObjectType({
	name: "Topic",
	fields: {
		title: {
			type: graphql.GraphQLString
		},
		body: {
			type: graphql.GraphQLString
		},
		description: {
			type: graphql.GraphQLString
		},
		category: {
			type: graphql.GraphQLString
		},
		time: {
			type: graphql.GraphQLInt
		}
	}
});


const QueryType = new graphql.GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		topics: {
			type: new graphql.GraphQLList(TopicsType),
			resolve: () =>  new Promise((resolve,reject) => {
				Topics.find({},(err,docs) => {
					if(err) {
						reject(err)
						return
					}
					resolve(docs);
				});
			})
		}
	})
})

module.exports = new graphql.GraphQLSchema({
	query: QueryType
});