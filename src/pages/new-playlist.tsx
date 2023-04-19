import { useCreatePlayList } from '@/api';
import { Button } from '@/components/common/button';
import { ImageInput } from '@/components/common/image-input';
import { Input } from '@/components/common/input';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';

export default function NewPlaylistPage() {
  const [title, setTitle] = React.useState('');
  const [cover, setCover] = React.useState<undefined | File>();
  const isSubmittable = title.length > 0 && !!cover;

  const { mutateAsync: createPlayList } = useCreatePlayList();
  const router = useRouter();

  const handleCreatePlaylist = () => {
    createPlayList({ title, cover: cover as File })
      .then(() => {
        toast.success(`${title} playlist created`);
        router.push('/');
      })
      .catch(console.error);
  };

  return (
    <>
      <Head>
        <title>Create a new playlist</title>
      </Head>
      <main className="flex min-h-screen w-screen flex-col items-center justify-center bg-chineseBlack">
        <ImageInput onChange={setCover} />
        <Input
          containerClassName="mt-6"
          placeHolder="Enter a title for your playlist"
          value={title}
          onChange={(value) => setTitle(value.target.value)}
        />
        <div className="mt-8 w-60">
          <Button
            fluid
            variant="dark"
            disable={!isSubmittable}
            onClick={handleCreatePlaylist}
          >
            Create
          </Button>
        </div>
      </main>
    </>
  );
}
