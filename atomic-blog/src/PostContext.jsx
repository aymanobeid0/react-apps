import { createContext, useState, useContext, useMemo } from "react";
import { faker } from "@faker-js/faker";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

const PostsContext = createContext();
function PostsProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");

  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }
  const value = useMemo(() => {
    return {
      posts: searchedPosts,
      onAddPost: handleAddPost,
      onClearPosts: handleClearPosts,
      searchQuery,
      setSearchQuery,
    };
  }, [searchedPosts, searchQuery]);
  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
}
function usePosts() {
  const context = useContext(PostsContext);
  if (context === undefined)
    throw new Error("PostsContext was used outside of the PostsProvider");
  return context;
}

export { PostsProvider, usePosts };
