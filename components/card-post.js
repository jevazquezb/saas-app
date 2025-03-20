const CardPost = ({ post }) => {
  return (
    <li className="bg-base-100 rounded-3xl p-6 flex justify-between items-center">
      <div>
        <div className="font-bold mb-1">{post.title}</div>
        {post.description && (
          <p className="opacity-80 leading-relaxed max-h-32 overflow-y-auto">
            {post.description}
          </p>
        )}
      </div>
      <button className="btn btn-square">🔼</button>
    </li>
  );
};

export default CardPost;
