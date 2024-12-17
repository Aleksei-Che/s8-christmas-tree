import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Tree {
  id: number;
  name: string;
  height: number;
  ornaments_count: number;
  ornaments_color: string;
  created_at: string;
}

export interface NewTree {
  name: string;
  height: number;
  ornaments_count: number;
  ornaments_color: string;
}

interface TreeState {
  trees: Tree[];
  loading: boolean;
  error: string | null;
}

const initialState: TreeState = {
  trees: [],
  loading: false,
  error: null,
};

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";


export const fetchTrees = createAsyncThunk("trees/fetchTrees", async () => {
  const response = await axios.get(`${apiUrl}/trees`);
  return response.data;
});

export const addTree = createAsyncThunk("trees/addTree", async (tree: NewTree) => {
  const response = await axios.post(`${apiUrl}/trees`, tree);
  return response.data;
});

export const updateTree = createAsyncThunk("trees/updateTree", async (updatedTree: Tree) => {
  const response = await axios.put(`${apiUrl}/trees/${updatedTree.id}`, updatedTree);
  return response.data;
});

const treeSlice = createSlice({
  name: "trees",
  initialState,
  reducers: {
    deleteTree(state, action: PayloadAction<number>) {
      state.trees = state.trees.filter((tree) => tree.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrees.fulfilled, (state, action: PayloadAction<Tree[]>) => {
        state.loading = false;
        state.trees = action.payload;
      })
      .addCase(fetchTrees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch trees.";
      })
      .addCase(addTree.fulfilled, (state, action: PayloadAction<Tree>) => {
        state.trees.push(action.payload);
      })
      .addCase(updateTree.fulfilled, (state, action: PayloadAction<Tree>) => {
        const index = state.trees.findIndex((tree) => tree.id === action.payload.id);
        if (index !== -1) {
          state.trees[index] = action.payload; 
        }
      })
  },
});

export const { deleteTree } = treeSlice.actions;
export default treeSlice.reducer;
