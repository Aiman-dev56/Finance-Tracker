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

const categories = {
  income: ["Salary", "Freelance", "Business", "Investment", "Other"],
  expense: ["Food", "Transport", "Shopping", "Bills"],
};
