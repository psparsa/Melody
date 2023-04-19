import { AiOutlineNodeIndex } from 'react-icons/ai';

export const NoResultCard = () => {
  return (
    <div className="flex w-100 flex-col items-center justify-center rounded-md bg-snow py-8 shadow-lg">
      <AiOutlineNodeIndex size={65} />
      <p className="mt-4">There is no result for your search query</p>
      <p>Try searching another keyword</p>
    </div>
  );
};
