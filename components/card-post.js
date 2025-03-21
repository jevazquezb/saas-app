import ButtonVote from "./button-vote";

const CardPost = ({ post }) => {
  return (
    <li className="bg-base-100 rounded-3xl p-6 flex justify-between items-start gap-3">
      <div>
        <div className="font-bold mb-1 text-lg">{post.title}</div>
        {post.description && (
          <p className="opacity-80 leading-relaxed max-h-32 overflow-y-auto">
            {post.description}
          </p>
        )}
      </div>
      <ButtonVote postId={`${post._id}`} initialVotes={post.votesCounter} />
    </li>
  );
};

export default CardPost;
