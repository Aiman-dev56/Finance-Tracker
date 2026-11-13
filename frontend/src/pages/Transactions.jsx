import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X, ReceiptText } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TransactionTable from "../components/TransactionTable";
import TransactionForm from "../components/TransactionForm";
import api, { getErrorMessage } from "../services/api";
