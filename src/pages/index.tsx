import HomeLayout from '@/components/layouts/home';
import { NextPageWithLayout, embedPageLayout } from './_app';
const Page: NextPageWithLayout = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <h1>Let's explore the Yasitan!</h1>
        <button>Start a new conversation</button>
      </div>
    </main>
  );
};

embedPageLayout(Page, HomeLayout);

export default Page;
