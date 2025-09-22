import React from "react";
import { Link, Links } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white pb-12">
      <h1 className="text-[38px] max-md:text-[28px] pb-4 pt-12 font-bold text-center">
        Privacy Policy
      </h1>
      <div className="w-[85%] max-md:w-[100%]  bg-[#fcfcfc] mx-auto my-auto h-[90%] pt-10 pb-12 px-8 max-md:px-5 max-md:pt-6  text-gray-800 space-y-10">
        <p className="font-semibold leading-snug">
          Effective Date: 01 Feb 2025
        </p>
        <div className="space-y-4 text-gray-700">
          <p className="leading-snug">
            At{" "}
            <Link to="/">
              <strong className="text-gray-600">BTJ Admirer</strong>
            </Link>
            , your privacy is of utmost importance to us. This Privacy Policy
            explains how we collect, use, protect, and disclose your information
            when you visit our website and make purchases. By using our website,
            you agree to the collection and use of information in accordance
            with this policy.
          </p>
        </div>

        <section className="space-y-4 text-gray-700">
          <h3 className="text-xl font-semibold">1. Information We Collect</h3>
          <p className="leading-snug">
            We collect several types of information for various purposes,
            including providing and improving our services to you. The types of
            information we may collect include:
          </p>
          <ul className="list-disc list-outside pl-6 space-y-3 ">
            <li className="leading-snug">
              <strong>Personal Information:</strong> When you create an account,
              make a purchase, or interact with our website, we may collect
              personal details such as your name, email address, phone number,
              shipping address, billing address, and payment information.
            </li>
            <li className="leading-snug">
              <strong>Usage Data:</strong> We may collect information on how you
              access and use our website, including your IP address, browser
              type, pages visited, and time spent on each page. This helps us
              analyze trends and improve your user experience.
            </li>
            <li className="leading-snug">
              <strong>Cookies and Tracking Data:</strong> We use cookies and
              similar tracking technologies to track activity on our website and
              to hold certain information. These cookies allow us to provide a
              better user experience, such as remembering your preferences.
            </li>
          </ul>
        </section>
        

        <section className="space-y-4 text-gray-700">
          <h3 className="text-xl font-semibold">
            2. How We Use Your Information
          </h3>
          <ul className="list-disc list-outside pl-6 space-y-2">
            <li className="leading-snug">
              To provide, operate, and maintain our website and services.
            </li>
            <li className="leading-snug">
              To process your orders, deliver products, and provide customer
              support.
            </li>
            <li className="leading-snug">
              To communicate with you, including sending order confirmations,
              updates, promotional materials, and responding to your inquiries.
            </li>
            <li className="leading-snug">
              To improve our website functionality, performance, and user
              experience.
            </li>
            <li className="leading-snug">
              To detect, prevent, and address technical issues or fraud.
            </li>
          </ul>
        </section>

        <section className="space-y-4 text-gray-700">
          <h3 className="text-xl font-semibold">
            3. Data Protection and Security
          </h3>
          <p className="leading-snug">
            We take the security of your personal information seriously. We use
            reasonable physical, technical, and administrative measures to
            protect your data from unauthorized access, alteration, disclosure,
            or destruction. However, please be aware that no method of
            transmission over the Internet is 100% secure, and while we strive
            to protect your personal data, we cannot guarantee its absolute
            security.
          </p>
        </section>

        <section className="space-y-4 text-gray-700">
          <h3 className="text-xl font-semibold">4. Sharing Your Information</h3>
          <p className="leading-snug">
            We do not sell, trade, or rent your personal information to third
            parties. We may share your information in the following
            circumstances:
          </p>
          <ul className="list-disc list-outside pl-6 space-y-2">
            <li className="leading-snug">
              <strong>Service Providers:</strong> We may share your personal
              information with trusted third-party service providers who assist
              us in operating our website, conducting business, or servicing
              you.
            </li>
            <li className="leading-snug">
              <strong>Legal Compliance:</strong> We may disclose your personal
              information if required by law or in response to valid requests by
              public authorities.
            </li>
          </ul>
        </section>

        <section className="space-y-4 text-gray-700">
          <h3 className="text-xl font-semibold">5. Cookies</h3>
          <p className="leading-snug">
            Our website uses cookies to enhance your browsing experience.
            Cookies are small files stored on your device that help us remember
            your preferences and understand how you interact with our site. You
            can manage or disable cookies through your browser settings, but
            please note that some parts of our website may not function properly
            if cookies are disabled.
          </p>
        </section>

        <section className="space-y-4 text-gray-700">
          <h3 className="text-xl font-semibold">6. Your Rights and Choices</h3>
          <ul className="list-disc list-outside pl-6 space-y-2">
            <li className="leading-snug">
              <strong>Access and Update Your Information:</strong> You may
              access, update, or correct your personal information at any time
              through your account settings or by contacting us directly at{" "}
              <a
                href="mailto:support@admirer.in"
                className="font-semibold text-gray-600 hover:underline"
              >
                support@admirer.in
              </a>
            </li>
            <li className="leading-snug">
              <strong>Request Deletion:</strong> You can request the deletion of
              your personal information, subject to any legal or contractual
              obligations.
            </li>
            <li className="leading-snug">
              <strong>Opt-Out of Marketing Communications:</strong> You can
              opt-out of receiving marketing emails by following the unsubscribe
              link or contacting us at{" "}
              <a
                href="mailto:support@admirer.in"
                className="font-semibold text-gray-600 hover:underline"
              >
                support@admirer.in
              </a>
            </li>
          </ul>
        </section>

        <section className="space-y-4 text-gray-700">
          <h3 className="text-xl font-semibold">7. Third-Party Links</h3>
          <p className="leading-snug">
            Our website may contain links to third-party websites. Please note
            that we are not responsible for the privacy practices or content of
            such websites. We encourage you to review the privacy policies of
            any third-party sites you visit.
          </p>
        </section>

        <section className="space-y-4 text-gray-700">
          <h3 className="text-xl font-semibold">8. Children's Privacy</h3>
          <p className="leading-snug">
            Our services are not intended for use by individuals under the age
            of 18. We do not knowingly collect personal information from
            children under 18. If we become aware that a child under 18 has
            provided us with personal information, we will take steps to delete
            such information.
          </p>
        </section>

        <section className="space-y-4 text-gray-700">
          <h3 className="text-xl font-semibold">
            9. Changes to This Privacy Policy
          </h3>
          <p className="leading-snug">
            We may update our Privacy Policy from time to time. Any changes will
            be posted on this page with an updated "Effective Date." We
            encourage you to review this Privacy Policy periodically to stay
            informed about how we are protecting your information.
          </p>
        </section>

        <section className="space-y-4 text-gray-700">
          <h3 className="text-xl font-semibold">10. Contact Us</h3>
          <p className="leading-snug">
            If you have any questions or concerns about this Privacy Policy or
            our privacy practices, please contact us at:
          </p>
          <p className="leading-snug">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:support@admirer.in"
              className="font-semibold text-gray-600 hover:underline"
            >
              support@admirer.in
            </a>
          </p>
          <p className="leading-snug">
            Thank you for trusting <Link to="/">BTJ Admirer</Link>. We value your
            privacy and are committed to keeping your information safe.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
