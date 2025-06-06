import React, { useRef, useState, FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

// Define form state type
interface FormState {
  name: string;
  email: string;
  message: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'https://my-portfolio-beige-alpha.vercel.app';

const Contact: React.FC = () => {
  // Use Ref with the proper type for HTMLFormElement
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [messageCard, setMessageCard] = useState<{ visible: boolean; text: string; type: "success" | "error" }>({
    visible: false,
    text: "",
    type: "success", // Default type
  });

  // Handle form change with typed event
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Handle form submission with typed event
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });


      const data = await response.json();

      if (response.ok) {
        setLoading(false);
        setMessageCard({
          visible: true,
          text: "Thank you. I will get back to you as soon as possible.",
          type: "success",
        });

        setForm({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error(data.error || 'Failed to send email');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error sending email:', error);

      setMessageCard({
        visible: true,
        text: "Ahh, something went wrong. Please try again.",
        type: "error",
      });
    }
  };

  const closeMessageCard = () => {
    setMessageCard({ visible: false, text: "", type: "success" });
  };

  return (
    <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              required
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              required
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              required
            />
          </label>
          <div className="flex justify-center">
            <button
              type='submit'
              className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>

        {/* Message Card */}
        {messageCard.visible && (
          <div className={`mt-4 p-4 rounded-lg ${messageCard.type === 'error' ? 'bg-red-200' : 'bg-green-500'} text-black`}>
            <p>{messageCard.text}</p>
            <button onClick={closeMessageCard} className="mt-2 text-black underline">
              Close
            </button>
          </div>
        )}
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");