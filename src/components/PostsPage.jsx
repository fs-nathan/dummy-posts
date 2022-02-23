import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import EditablePostsListList from "./EditablePostsList";
import { ToggleablePostForm } from "./ToggleablePostForm";
import ApiClient from "../utils/api-client";

export const PostsPage = (props) => {
  const { owner } = props;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPostsFromServer();
    const interval = setInterval(loadPostsFromServer, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []); // effect runs once

  const loadPostsFromServer = () => {
    ApiClient.getPosts(owner.id, (serverPosts) => {
      setPosts(serverPosts);
    });
  };

  /** Event handlers */

  const handleEditFormSubmit = (data) => {
    // client update
    setPosts(
      posts.map((post) => {
        if (post.id === data.id) {
          return Object.assign({}, post, {
            title: data.title,
          });
        } else {
          return post;
        }
      })
    );

    // server update
    ApiClient.updatePost(owner.id, data);
  };

  const handleTrashClick = (id) => {
    // client update
    setPosts(posts.filter((post) => post.id !== id));

    // server update
    ApiClient.deletePost(owner.id, { id: id });
  };

  const handleCreateFormSubmit = (post) => {
    // client update
    setPosts(posts.concat({ ...post, ownerId: owner.id, id: uuidv4() }));

    // server update
    ApiClient.createPost(owner.id, post);
  };

  return (
    <div className="ui three column centered grid">
      <div className="column">
        <EditablePostsListList
          posts={posts}
          onFormSubmit={handleEditFormSubmit}
          onTrashClick={handleTrashClick}
        />
        <ToggleablePostForm onFormSubmit={handleCreateFormSubmit} />
      </div>
    </div>
  );
};
