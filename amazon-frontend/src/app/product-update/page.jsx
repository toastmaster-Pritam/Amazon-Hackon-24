"use client";

import { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";

export default function Component() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState({});
  const [old, setOld] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product });
    setOld(product);
    setIsEditModalOpen(true);
  };

  const handleSubmitEdit = async (updatedProduct) => {
    try {
      const oldProduct = { ...old };
      const formData = new FormData();
      formData.append("image1", oldProduct.imgFile);
      formData.append("image2", updatedProduct.imgFile);
      formData.append("text1", oldProduct.description);
      formData.append("text2", updatedProduct.description);

      const res = await axios.post(
        "http://127.0.0.1:5000/validate-product-update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      if(res.data[1]=="Valid"){
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === updatedProduct.id ? updatedProduct : p
          )
        );
        setEditingProduct(null);
        setIsEditModalOpen(false);
        toast.success("Edited successfully")
      }else if(res.data[1]=="Invalid"){
        toast.error("Product info cannot be edited");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct({
      id: products.length + 1,
      image: "",
      imgFile: null,
      name: "",
      description: "",
    });
    setIsAddModalOpen(true);
  };

  const handleSubmitAdd = (newProduct) => {
    setProducts([...products, newProduct]);
    setEditingProduct(null);
    setIsAddModalOpen(false);
  };

  const handleCloseModal = () => {
    setEditingProduct(null);
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-transparent bg-clip-text">
          Fake Product Update Detection
        </h1>
        <div>
          <Button onClick={handleAddProduct} className="mr-2">
            Add Product
          </Button>
          <Button onClick={() => router.push("/")}>Back</Button>
        </div>
      </div>
      <div className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img
                    src={product.image} // Using wildcard for image format
                    width="100"
                    height="100"
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditProduct(product)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {(isEditModalOpen || isAddModalOpen) && (
        <Dialog open={isEditModalOpen || isAddModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {isEditModalOpen ? "Edit Product" : "Add Product"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="image" className="text-right">
                  Image
                </Label>
                <Input
                  id="image"
                  type="file"
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      image: URL.createObjectURL(e.target.files[0]),
                      imgFile: e.target.files[0],
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  rows={2}
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      description: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() =>
                  isEditModalOpen
                    ? handleSubmitEdit(editingProduct)
                    : handleSubmitAdd(editingProduct)
                }
              >
                Submit
              </Button>
              <Button variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
