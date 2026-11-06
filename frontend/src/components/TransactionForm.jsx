import { useState } from "react";
import { getErrorMessage } from "../services/api";

const initialForm = {
  type: "expense",
  title: "",
  amount: "",
  category: "Food",
  payment_method: "cash",
  transaction_date: new Date().toLocaleDataString("en-CA"),
  notes: "",
};
