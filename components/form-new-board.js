"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const FormNewBoard = ({ onBoardAdded }) => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    try {
      /**
       * axios function does the same as the following in one step:
       *
       * const response = await fetch("/api/board", {
       *  method: "POST",
       *  body: JSON.stringify({
       *    name,
       *  }),
       *  headers: {
       *    "Content-Type": "application/json",
       *  },
       * });
       *
       * const data = await response.json();
       */

      const response = await axios.post("/api/board", { name });
      const newBoard = response.data;

      setName("");
      toast.success("Board created!");
      onBoardAdded(newBoard);
    } catch (error) {
      // 'response' object in error comes from the axios response
      const errorMessage =
        error.response?.data?.error || error.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="bg-base-100 p-8 rounded-3xl space-y-8"
      onSubmit={handleSubmit}
    >
      <p className="font-bold text-lg">Create a new feedback board</p>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Board name</span>
        </div>
        <input
          type="text"
          placeholder="Type here your board name"
          className="input input-bordered w-full"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </label>
      <button type="submit" className="btn btn-primary w-full">
        {isLoading && (
          <span className="loading loading-spinner loading-xs"></span>
        )}
        Create Board
      </button>
    </form>
  );
};

export default FormNewBoard;
