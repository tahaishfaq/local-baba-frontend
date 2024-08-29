export default function NewsLetter() {
  return (
    <div className="bg-[#FE4101] py-16 sm:py-24 lg:py-32 font-figtree">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 items-center">
        <div className="max-w-lg text-3xl font-bold  text-gray-900 sm:text-4xl lg:col-span-7 space-y-5">
          <h2 className="inline text-4xl font-bold text-[#FFFFFF] mb-4 sm:block lg:inline xl:block">
            Subcribe to our Newsletter
          </h2>{" "}
          <div className="max-w-md">
            <p className=" text-base text-justify font-light text-[#ECECEC] sm:block lg:inline xl:block">
              Subscribe for Updates: Stay informed about the latest investor
              updates, financial results, and announcements by subscribing to
              our newsletter.{" "}
            </p>
          </div>
        </div>
        <form className="w-full max-w-md lg:col-span-5">
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
              className="w-full py-5 pl-8 pr-[100px] bg-[#FFFFFF26] placeholder-white text-[#FFFFFF] rounded-full border-0 font-light focus:outline-none focus:ring-0"
            />
            <button
              type="submit"
              className="absolute right-0 inset-y-0 text-sm bg-white text-[#FE4101] font-medium px-6 rounded-r-full"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
