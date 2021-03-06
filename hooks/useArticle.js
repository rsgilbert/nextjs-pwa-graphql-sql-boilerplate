import { useQuery, useMutation } from '@apollo/react-hooks'

import { GET_ARTICLES, GET_ARTICLE, ADD_ARTICLE, UPDATE_ARTICLE, DELETE_ARTICLE } from '../graphql/article/queries'

// { data, loading, error } = useGetArticles()
export const useGetArticles = () => useQuery(GET_ARTICLES)

// const { data, loading, error } = useGetArticle('slug-1')
export const useGetArticle = (articleSlug) => useQuery(GET_ARTICLE(articleSlug))

// addArticle({ variables })
export const useAddArticle = () => {
  const [addArticleMutation] = useMutation(ADD_ARTICLE, {
    update: (cache, { data: { addArticle } }) => {
      const { articles } = cache.readQuery({ query: GET_ARTICLES })
      cache.writeQuery({
        query: GET_ARTICLES,
        data: {
          articles: [...articles, addArticle]
        }
      })
    }
  })
  return addArticleMutation
}

// updateArticle({ variables })
export const useUpdateArticle = () => {
  const [updateArticleMutation] = useMutation(UPDATE_ARTICLE, {
    update: (cache, { data: { updateArticle } }) => {
      const { articles } = cache.readQuery({ query: GET_ARTICLES })
      cache.writeQuery({
        query: GET_ARTICLES,
        data: {
          articles: articles.map(articleItem => articleItem.id !== updateArticle.id ? articleItem : updateArticle)
        }
      })
    }
  })
  return updateArticleMutation
}

// deleteArticle({ variables })
export const useDeleteArticle = () => {
  const [deleteArticleMutation] = useMutation(DELETE_ARTICLE, {
    update: (cache, { data: { deleteArticle } }) => {
      const { articles } = cache.readQuery({ query: GET_ARTICLES })
      cache.writeQuery({
        query: GET_ARTICLES,
        data: {
          articles: articles.filter(articleItem => articleItem.id !== deleteArticle.id)
        }
      })
    }
  })
  return deleteArticleMutation
}
