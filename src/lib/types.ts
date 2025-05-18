export interface Category {
  name: string;
  amount: string | null;
}

export interface IncomeSource {
  id: string;
  name: string;
  amount: string;
  date: Date;
  categories: Category[];
  category: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Expense {
  id: string;
  name: string;
  amount: string;
  date: Date;
  categories: Category[];
  category: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Budget {
  id: string;
  userId: string;
  categories: Category[];
  createdAt: Date;
  updatedAt: Date;
}
