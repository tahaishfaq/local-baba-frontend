import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../utils/axiosInstance";
import { toast, Toaster } from "sonner";

const ContactUsForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Your name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email address is required"),
      phone: Yup.string(),
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await axiosInstance.post("/global/contact-us", values).then((res) => {
          console.log("contact-us", res);
          toast.success("Message sent successfully!");
          resetForm();
        })
      } catch (error) {
        console.error("Error sending message:", error);
        toast.error("Failed to send the message. Please try again later.");
      }
    },
  });

  return (
    <>
    <Toaster richColors position="top-center" />
    <div className="bg-white pt-8 md:pt-12 font-figtree">
      <section className="mx-auto max-w-[1440px] space-y-10 lg:space-y-20 lg:px-0 px-4">
        <div className="lg:text-6xl text-3xl font-bold text-[#0D4041] lg:leading-[4.5rem]">
          <h2 className="">Get in touch with us.</h2>
          <p className="">We’re here to assist you.</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="mx-auto space-y-10 ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
            <div>
              <label className="block text-[#004744] font-light text-lg mb-1">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                className="focus:ring-0 focus:outline-none border-[#CACACA] border-t-0 border-x-0 focus:border-[#004744] w-full px-0"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              ) : null}
            </div>
            <div>
              <label className="block text-[#004744] font-light text-lg mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="focus:ring-0 focus:outline-none border-[#CACACA] border-t-0 border-x-0 focus:border-[#004744] w-full px-0"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div>
              <label className="block text-[#004744] font-light text-lg mb-1">
                Phone Number (optional)
              </label>
              <input
                type="text"
                name="phone"
                className="focus:ring-0 focus:outline-none border-[#CACACA] border-t-0 border-x-0 focus:border-[#004744] w-full px-0"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div>
            <label className="block text-[#004744] font-light text-lg mb-1">
              Message
            </label>
            <textarea
              rows={3}
              name="message"
              className="focus:ring-0 focus:outline-none border-[#CACACA] border-t-0 border-x-0 focus:border-[#004744] w-full px-0"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.touched.message && formik.errors.message ? (
              <div className="text-red-500 text-sm">
                {formik.errors.message}
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            className="bg-[#FE4101] text-white py-4 px-[32px] rounded-full font-normal text-sm"
          >
            Leave us a Message
          </button>
        </form>
      </section>

      <section className="mt-16 bg-gray-50 rounded-lg py-[80px]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-start gap-8 md:gap-14">
            <div className="max-w-xs flex flex-col items-start space-y-5">
              <h4 className="font-normal text-xl sm:text-2xl md:text-[24px] lg:text-[24px] text-[#0D4041] mb-2">
                Contact Info
              </h4>
              <p className="text-[#0D4041] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-4xl">
                We are always happy to assist you
              </p>
            </div>
            <div className="w-full max-w-xs pt-10">
              <h4 className="text-xl sm:text-2xl md:text-[22px] lg:text-[22px] font-medium text-[#0D4041] mb-4">
                Email Address
                <br />
                <span>-</span>
              </h4>
              <p className="text-[#0D4041] text-lg sm:text-xl md:text-[22px] lg:text-[22px] font-medium mb-4">
                help@info.com
              </p>

              <p className="text-[#0D4041] text-base sm:text-lg md:text-xl font-light">
                Assistance hours:
              </p>
              <p className="text-[#0D4041] text-base sm:text-lg md:text-xl font-light">
                Monday – Friday: 6am to 8pm EST
              </p>
            </div>
            <div className="w-full max-w-xs pt-10">
              <h4 className="text-xl sm:text-2xl md:text-[22px] lg:text-[22px] font-medium text-[#0D4041] mb-4">
                Number
                <br />
                <span>-</span>
              </h4>
              <p className="text-[#0D4041] text-lg sm:text-xl md:text-[22px] lg:text-[22px] font-medium mb-4">
                (800) 998-94256
              </p>

              <p className="text-[#0D4041] text-base sm:text-lg md:text-xl font-light">
                Assistance hours:
              </p>
              <p className="text-[#0D4041] text-base sm:text-lg md:text-xl font-light">
                Monday – Friday: 6 am to 8 pm EST
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default ContactUsForm;
