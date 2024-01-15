import { useForm } from "react-hook-form";
import { UserType } from "../../../../backend/src/shared/types";

type Props = {
  currentUser: UserType;
};

type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
};

const BookingForm = ({ currentUser }: Props) => {
  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
    },
  });
  return (
    <form className="grid grid-cols-1 gap-5 rounded-lg border-slate-300 p-5">
      <span className="text-3xl font-bold">Confirm Your Dettails</span>
      <div className="grid grid-cols-2 gap-6 ">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            type="text"
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            type="text"
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            type="email"
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Your Price Summary:
        <input
          type="text"
          className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200"
          readOnly
          disabled
          {...register("email")}
        />
      </label>
      <img
        src="data:image/png;base64,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"
        alt=""
      />
      <div className="font-bold bg-green-800 hover:bg-gray-400 text-white">
        Coming soon
      </div>
    </form>
  );
};

export default BookingForm;
