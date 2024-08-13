export default function NewsLetter() {
  return (
    <div className="bg-[#FE4101] py-16 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="max-w-lg text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:col-span-7">
          <h2 className="inline text-4xl font-bold text-[#FFFFFF] mb-4 sm:block lg:inline xl:block">
            Subcribe to our Newsletter
          </h2>{" "}
          <p className=" text-base font-normal text-[#ECECEC] sm:block lg:inline xl:block">
            Subscribe for Updates: Stay informed about the latest investor
            updates, financial results, and announcements by subscribing to our
            newsletter.{" "}
          </p>
        </div>
        <form className="w-full max-w-md lg:col-span-5 lg:pt-2">



        <div className="relative w-full max-w-md">
      <label htmlFor="email-address" className="sr-only">
        Email address
      </label>
      <input
        id="email-address"
        name="email"
        type="email"
        required
        placeholder="Enter your email"
        autoComplete="email"
        className="w-full py-3 pl-4 pr-[100px] bg-[#FFFFFF26] placeholder-white text-[#FFFFFF] rounded-full "
      />
      <button
        type="submit"
        className="absolute right-1 top-1 bottom-1 bg-white text-[#FE4101] font-semibold py-2 px-4 rounded-full"
      >
        Subscribe
      </button>
    </div>
          
        </form>
      </div>
    </div>
  );
}
