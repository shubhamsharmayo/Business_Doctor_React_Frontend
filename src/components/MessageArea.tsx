import type { MessageAreaProps } from "@/types/chat.types";
import { LucideSparkles, User } from "lucide-react";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";



const PremiumTypingAnimation = () => {
  return (
    <div className="flex items-center">
      <div className="flex items-center space-x-1.5">
        <div
          className="w-1.5 h-1.5 bg-gray-400/70 rounded-full animate-pulse"
          style={{ animationDuration: "1s", animationDelay: "0ms" }}
        ></div>
        <div
          className="w-1.5 h-1.5 bg-gray-400/70 rounded-full animate-pulse"
          style={{ animationDuration: "1s", animationDelay: "300ms" }}
        ></div>
        <div
          className="w-1.5 h-1.5 bg-gray-400/70 rounded-full animate-pulse"
          style={{ animationDuration: "1s", animationDelay: "600ms" }}
        ></div>
      </div>
    </div>
  );
};

// const SearchStages = ({ searchInfo }) => {
//   if (!searchInfo || !searchInfo.stages || searchInfo.stages.length === 0)
//     return null;

//   console.log("searchInfo", searchInfo);

//   return (
//     <div className="mb-3 mt-1 relative pl-4">
//       {/* Search Process UI */}
//       <div className="flex flex-col space-y-4 text-sm text-gray-700">
//         {/* Searching Stage */}
//         {searchInfo.stages.includes("searching") && (
//           <div className="relative">
//             {/* Green dot */}
//             <div className="absolute -left-3 top-1 w-2.5 h-2.5 bg-teal-400 rounded-full z-10 shadow-sm"></div>

//             {/* Connecting line to next item if reading exists */}
//             {searchInfo.stages.includes("reading") && (
//               <div className="absolute -left-[7px] top-3 w-0.5 h-[calc(100%+1rem)] bg-gradient-to-b from-teal-300 to-teal-200"></div>
//             )}

//             <div className="flex flex-col">
//               <span className="font-medium mb-2 ml-2">Searching the web</span>

//               {/* Search Query in box styling */}
//               <div className="flex flex-wrap gap-2 pl-2 mt-1">
//                 <div className="bg-gray-100 text-xs px-3 py-1.5 rounded border border-gray-200 inline-flex items-center">
//                   <svg
//                     className="w-3 h-3 mr-1.5 text-gray-500"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                     ></path>
//                   </svg>
//                   {searchInfo.query}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Reading Stage */}
//         {searchInfo.stages.includes("reading") && (
//           <div className="relative">
//             {/* Green dot */}
//             <div className="absolute -left-3 top-1 w-2.5 h-2.5 bg-teal-400 rounded-full z-10 shadow-sm"></div>

//             <div className="flex flex-col">
//               <span className="font-medium mb-2 ml-2">Reading</span>

//               {/* Search Results */}
//               {searchInfo.urls && searchInfo.urls.length > 0 && (
//                 <div className="pl-2 space-y-1">
//                   <div className="flex flex-wrap gap-2">
//                     {Array.isArray(searchInfo.urls) ? (
//                       searchInfo.urls.map((url, index) => (
//                         <div
//                           key={index}
//                           className="bg-gray-100 text-xs px-3 py-1.5 rounded border border-gray-200 truncate max-w-[200px] transition-all duration-200 hover:bg-gray-50"
//                         >
//                           {typeof url === "string"
//                             ? url
//                             : JSON.stringify(url).substring(0, 30)}
//                         </div>
//                       ))
//                     ) : (
//                       <div className="bg-gray-100 text-xs px-3 py-1.5 rounded border border-gray-200 truncate max-w-[200px] transition-all duration-200 hover:bg-gray-50">
//                         {typeof searchInfo.urls === "string"
//                           ? searchInfo.urls.substring(0, 30)
//                           : JSON.stringify(searchInfo.urls).substring(0, 30)}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Writing Stage */}
//         {searchInfo.stages.includes("writing") && (
//           <div className="relative">
//             {/* Green dot with subtle glow effect */}
//             <div className="absolute -left-3 top-1 w-2.5 h-2.5 bg-teal-400 rounded-full z-10 shadow-sm"></div>
//             <span className="font-medium pl-2">Writing answer</span>
//           </div>
//         )}

//         {/* Error Message */}
//         {searchInfo.stages.includes("error") && (
//           <div className="relative">
//             {/* Red dot over the vertical line */}
//             <div className="absolute -left-3 top-1 w-2.5 h-2.5 bg-red-400 rounded-full z-10 shadow-sm"></div>
//             <span className="font-medium">Search error</span>
//             <div className="pl-4 text-xs text-red-500 mt-1">
//               {searchInfo.error || "An error occurred during search."}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

const cleanEscapedContent = (content: string) => {
  return content
    .replace(/\\n/g, '\n')        // Convert literal "\n" to real newline
    .replace(/\\"/g, '"')         // Optional: fix \" to "
    .replace(/\\\\/g, '\\');      // Fix escaped backslashes
};



const MessageArea = ({ messages}:MessageAreaProps) => {

  //console.log("message area", messages);
  const bottomRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" }); // 👈 scroll when messages update
    }
  }, [messages]);

  return (
    <div
      className="flex-grow overflow-y-auto bg-gradient-to-b from-slate-50 via-gray-50 to-slate-100 border-b 
        border-slate-200/50"
      style={{ minHeight: 0 }}
    >
      <div className="mx-auto p-6 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            {/* AI Icon - Left side for AI messages */}
            {!message.isUser && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-md">
                <LucideSparkles className="w-4 h-4 text-white" />
              </div>
            )}

            <div className="flex flex-col max-w-2xl">
              {/* Search Status Display - Above the message */}
              {/* {!message.isUser && message.searchInfo && (
                <div className="mb-2">
                  <SearchStages searchInfo={message.searchInfo} />
                </div>
              )} */}

              {/* Message Content */}
              <div
                className={`rounded-2xl py-4 px-6 transition-all duration-200 ${
                  message.isUser
                    ? "bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 text-white rounded-tr-md shadow-lg hover:shadow-xl border border-indigo-500/20"
                    : "bg-white/95 backdrop-blur-sm text-slate-800 border border-slate-200/60 rounded-tl-md shadow-sm hover:shadow-md hover:bg-white"
                }`}
              >
                {message.isLoading ? (
                  <PremiumTypingAnimation />
                ) : (
                  <div className="prose prose-sm prose-slate max-w-none">
                    <ReactMarkdown>{cleanEscapedContent(message.content)}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>

            {/* User Icon - Right side for user messages */}
            {message.isUser && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}

        {/* 👇 This div triggers scroll into view */}
        <div ref={bottomRef} />

      </div>
    </div>
  );
};

export default MessageArea;
