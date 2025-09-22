interface Props {
  message?: string;
}

export default function LoadingOverlay({ message = "Loading..." }: Props) {
  return (
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-3"></div>
        <p className="text-gray-700 font-medium">{message}</p>
      </div>
    </div>
  );
}
