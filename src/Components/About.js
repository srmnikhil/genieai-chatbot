const About = () => {
  return (
    <section className="bg-transparent p-8 rounded-2xl">
      {/* About GenieAI Section */}
      <div className="max-w-4xl mx-auto mb-16 text-center text-white">
        <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
          About GenieAI Chatbot
        </h2>
        <p className="text-lg mb-4 drop-shadow-md">
          GenieAI is a chatbot that uses Gemini Google AI Docs. It is designed as it only reply to your tech related or programming, coding related questions in a funnier way and understand what you're asking. Whether you need a technical help, advice, or just want to have some fun, GenieAI is ready to talk anytime.
        </p>
        <p className="mt-4 text-lg">
          Start Messaging
        </p>
      </div>

      {/* About Developer Section */}
      <div className="hidden lg:block max-w-4xl mx-auto text-center text-white">
        <h2 className="text-3xl font-bold mb-4 drop-shadow-lg">About the Developer</h2>
        <p className="text-lg mb-4 drop-shadow-md">
          This chatbot was created by <a className="italic hover:text-blue-700 hover:underline font-bold" href="https://www.linkedin.com/in/srmnikhil" target="_blank" rel="noreferrer">Nikhil Sharma</a> to provide a funnier response of tech related questions for users. The development process included integrating gemini with some changes and designing a user-friendly interface. This chatbot is updating so stay tuned for more updates on future features!
        </p>
      </div>
    </section>
  );
};

export default About;
