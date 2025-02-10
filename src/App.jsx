import React, { useEffect, useState } from "react";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { RoomProvider } from "@liveblocks/react";
import DailyIframe from "@daily-co/daily-js";


const ROOM_NAME = "my-room";
const DAILY_URL = "https://dhwni.daily.co/F9gN79BwIw0ZJ1sLk8Wd";

export default function CollaborativeWhiteboard() {
  const [callFrame, setCallFrame] = useState(null);
  const [isInCall, setIsInCall] = useState(false);

  useEffect(() => {
    return () => {
      if (callFrame) {
        callFrame.leave();
      }
    };
  }, [callFrame]);

  const startCall = () => {
    if (!callFrame) {
      const frame = DailyIframe.createFrame({
        showLeaveButton: true,
        iframeStyle: {
          position: "fixed",
          top: "10px",
          left: "10px",
          width: "700px",
          height: "700px",
          zIndex: 1000,
        },
      });
      frame.join({ url: DAILY_URL });
      setCallFrame(frame);
      setIsInCall(true);
    }
  };

  const leaveCall = () => {
    if (callFrame) {
      callFrame.leave();
      setCallFrame(null);
      setIsInCall(false);
    }
  };

  return (
    <RoomProvider id={ROOM_NAME}>
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        {/* <h1 className="text-xl font-bold mb-4">Collaborative Whiteboard</h1> */}
        <div className="w-full h-screen  rounded-xl shadow-lg overflow-hidden">
          <Tldraw persistenceKey={ROOM_NAME} autoFocus />
        </div>
        <div className="absolute bottom-10 right-10">
          {!isInCall ? (
            <button onClick={startCall} className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg">Start Video Call</button>

          ) : (
              <button onClick={leaveCall} className="group relative bg-slate-900 h-16 w-64 border-2 border-teal-600 text-white text-base font-bold rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:border-emerald-400 hover:text-emerald-300 p-3 text-left before:absolute before:w-10 before:h-10 before:content[''] before:right-2 before:top-2 before:z-10 before:bg-indigo-500 before:rounded-full before:blur-lg before:transition-all before:duration-500 after:absolute after:z-10 after:w-16 after:h-16 after:content[''] after:bg-teal-400 after:right-6 after:top-4 after:rounded-full after:blur-lg after:transition-all after:duration-500 hover:before:right-10 hover:before:-bottom-4 hover:before:blur hover:after:-right-6 hover:after:scale-110">Leave Call</button>
          )}
        </div>
      </div>
    </RoomProvider>
  );
}
