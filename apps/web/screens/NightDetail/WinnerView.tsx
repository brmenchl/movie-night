import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';

export const WinnerView = ({
  friend,
  title,
}: {
  friend: string;
  title: string;
}) => {
  return (
    <>
      <motion.div
        className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-slate-500 bg-opacity-50"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
      >
        <motion.div
          // ref={scope}
          className="rounded-md bg-white flex-col items-center"
          animate={{
            scale: 3,
            transition: { type: 'spring', duration: 1 },
          }}
        >
          <h1 className="text-center text-4xl font-extrabold tracking-tight">
            {title}
          </h1>
          <h2 className="text-center text-3xl font-semibold tracking-tight">
            {friend}
          </h2>
        </motion.div>
      </motion.div>
      <Player
        src="https://lottie.host/5020cd32-9069-4aa0-a6fd-38dbadf942b2/Gfls0Osss0.json"
        autoplay
        className="absolute top-0 right-0 left-0 bottom-0"
      />
      <Player
        src="https://lottie.host/4c0047e8-ed06-4a3f-ae9e-973e1abdd06a/EukTHudGYZ.json"
        autoplay
        className="absolute top-0 right-0 left-0 bottom-0"
      />
      <Player
        src="https://lottie.host/998580bc-8752-4a6d-8a22-bbe30e8e797e/jV7YdjT3lk.json"
        autoplay
        className="absolute top-0 right-0 left-0 bottom-0"
      />
    </>
  );
};
