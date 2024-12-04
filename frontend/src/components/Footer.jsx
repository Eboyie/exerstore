import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <section className="mx-auto flex flex-col justify-center bg-gray-800 ">
      <div className="align-element py-4 flex flex-col lg:flex-row sm:gap-x-16 lg:items-center lg:py-8">
        <div className="flex flex-col lg:w-1/3">
          <h2 className="text-2xl font-bold">
            2<span className="text-sky-300">BE</span>
          </h2>
          <article className="">
            <h2 className="text-xl mb-2 font-semibold tracking-wide">
              Customer Support
            </h2>
            <p>
              Our team is available 24/7 to answer your questions. Additionally,
              there are answers to most of the questions you might have. Check
              our
              <span>
                <button className="bg-pink-400 ml-2 px-2 text-sm rounded-md text-white hover:bg-pink-700 transition-all duration-300 ease-linear">
                  {' '}
                  FAQs
                </button>
              </span>
            </p>
          </article>
        </div>

        {/* Services */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 mt-4 w-full ">
          <article className="flex flex-col flex-wrap mb-4">
            <h2 className="text-xl mb-1 font-semibold tracking-wide text-gray-300">
              Services
            </h2>
            <p>Wholesale</p>
            <p>Installations Services</p>
            <p>Quick Delivery Methods</p>
            <p>Financing</p>
          </article>

          <article className="mb-4">
            <h2 className="text-xl mb-1 font-semibold tracking-wide text-gray-300">
              About Us
            </h2>
            <p>Company overview</p>
            <p>Blog</p>
            <p>Jobs</p>
            <p>Partners</p>
          </article>

          <article className="flex flex-col flex-wrap mb-4">
            <h2 className="text-xl mb-1 font-semibold tracking-wide text-gray-300">
              Contact
            </h2>
            <p>
              Call at
              <span className="text-md ">+123 456 789</span>
            </p>
            <p>
              Write us <br /> at email@example.com
            </p>
            <p>Visit at 123 main street.</p>
          </article>

          <article className="flex flex-col flex-wrap">
            <h2 className="text-xl mb-1 font-semibold tracking-wide text-gray-300">
              Social Media
            </h2>
            <Link
              to={'/'}
              className="flex items-center gap-2 hover:text-blue-500 transition-all duration-300 ease-in-out"
            >
              <p className="text-blue-500">
                <FaFacebook />
              </p>
              <p>Facebook</p>
            </Link>
            <Link
              to={'/'}
              className="flex items-center gap-2 hover:text-pink-600 transition-all duration-300 ease-in-out"
            >
              <p className="text-pink-600">
                <FaTwitter />
              </p>
              <p>Twitter</p>
            </Link>
            <Link
              to={'/'}
              className="flex items-center gap-2 hover:text-blue-600 transition-all duration-300 ease-in-out"
            >
              <p className="text-blue-600">
                <FaLinkedin />
              </p>
              LinkedIn
            </Link>
            <Link
              to={'/'}
              className="flex items-center gap-2 hover:text-pink-400 transition-all duration-300 ease-in-out"
            >
              <p className="text-pink-400">
                <FaInstagram />
              </p>
              <p>Instagram</p>
            </Link>
          </article>
        </div>
      </div>

      <div className="bg-gray-900 py-4 text-center text-white">
        <p>&copy; 2024 2BE. All rights reserved</p>
      </div>
    </section>
  );
};
export default Footer;
