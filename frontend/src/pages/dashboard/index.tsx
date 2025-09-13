import Header from "../../components/header";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-background w-full flex-col md:flex">
      <Header />
      <Outlet />
    </div>
  );
};

// type ConfirmDialogProps = {
//   open: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
//   title: string;
//   message: string;
// };

// const ConfirmDialog = ({
//   open,
//   onClose,
//   onConfirm,
//   title,
//   message,
// }: ConfirmDialogProps) => {
//   if (!open) return null;
//   return (
//     <div
//       className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-sm m-4 p-6"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">
//           {title}
//         </h2>
//         <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
//           {message}
//         </p>
//         <div className="mt-6 flex justify-end gap-3">
//           <Button variant="outline" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button variant="destructive" onClick={onConfirm}>
//             Confirm
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

export default Home;
