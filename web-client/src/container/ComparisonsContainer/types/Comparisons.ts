import * as Types from '../../../../graphql/types/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type QueryComparisonQueryVariables = Types.Exact<{
  limit: Types.Scalars['Float'];
  page: Types.Scalars['Float'];
}>;


export type QueryComparisonQuery = { __typename?: 'Query', queryComparison: Array<{ __typename?: 'Comparison', description: string, createdAt: string, id?: string | null | undefined, title: string, updatedAt: string, category: { __typename?: 'ComparisonCategory', createdAt: string, description: string, id?: string | null | undefined, title: string, updatedAt: string }, comparisonEntities: Array<{ __typename?: 'ComparisonEntity', createdAt: string, description: string, id?: string | null | undefined, link: string, title: string, type: Types.ComparisonEntityType, updatedAt: string }> }> };


export const QueryComparisonDocument = gql`
    query QueryComparison($limit: Float!, $page: Float!) {
  queryComparison(limit: $limit, page: $page) {
    category {
      createdAt
      description
      id
      title
      updatedAt
    }
    comparisonEntities {
      createdAt
      description
      id
      link
      title
      type
      updatedAt
    }
    description
    createdAt
    id
    title
    updatedAt
  }
}
    `;

/**
 * __useQueryComparisonQuery__
 *
 * To run a query within a React component, call `useQueryComparisonQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryComparisonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryComparisonQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useQueryComparisonQuery(baseOptions: Apollo.QueryHookOptions<QueryComparisonQuery, QueryComparisonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryComparisonQuery, QueryComparisonQueryVariables>(QueryComparisonDocument, options);
      }
export function useQueryComparisonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryComparisonQuery, QueryComparisonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryComparisonQuery, QueryComparisonQueryVariables>(QueryComparisonDocument, options);
        }
export type QueryComparisonQueryHookResult = ReturnType<typeof useQueryComparisonQuery>;
export type QueryComparisonLazyQueryHookResult = ReturnType<typeof useQueryComparisonLazyQuery>;
export type QueryComparisonQueryResult = Apollo.QueryResult<QueryComparisonQuery, QueryComparisonQueryVariables>;
export const namedOperations = {
  Query: {
    QueryComparison: 'QueryComparison'
  }
}