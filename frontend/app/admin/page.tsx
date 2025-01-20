'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'react-hot-toast';
import { AdminForm } from '@/components/AdminForm';
type SpecsType = {
    [key: string]: {
      [key: string]: unknown;
    };
  };
interface ComponentSpec {
  id: number;
  manufacturer: string;
  modelName: string;
  specs: SpecsType;
  msrp: number;
  imageUrl?: string;
}

type ComponentType = 'case' | 'cooler' | 'cpu' | 'gpu' | 'motherboard' | 'psu' | 'ram' | 'storage';

  
  // 在组件中使用
const API_BASE_URL = 'http://localhost:8080/api';

export default function ComponentsAdmin() {
  const [components, setComponents] = useState<ComponentSpec[]>([]);
  const [selectedType, setSelectedType] = useState<ComponentType>('cpu');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<ComponentSpec | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { register, handleSubmit, reset, setValue } = useForm<ComponentSpec>();

  const fetchComponents = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/${selectedType}`);
      if (!response.ok) throw new Error('Failed to fetch components');
      const data = await response.json();
      setComponents(data.data);
    } catch (error) {
      toast.error('Failed to fetch components');
    }
  };

  useEffect(() => {
    fetchComponents();
  }, [selectedType]);

  const onSubmit = async (data: ComponentSpec) => {
    try {
      data.msrp = Number(data.msrp);
      
      const url = `${API_BASE_URL}/${selectedType}${isEditMode ? `/${data.id}` : ''}`;
      const response = await fetch(url, {
        method: isEditMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to save component');

      toast.success(`Component ${isEditMode ? 'updated' : 'added'} successfully`);
      setIsDialogOpen(false);
      reset();
      fetchComponents();
    } catch (error) {
      toast.error('Failed to save component');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this component?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/${selectedType}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete component');

      toast.success('Component deleted successfully');
      fetchComponents();
    } catch (error) {
      toast.error('Failed to delete component');
    }
  };

  const handleEdit = (component: ComponentSpec) => {
    try {
        setSelectedComponent(component);
        setIsEditMode(true);
        setValue('id', component.id);
        setValue('manufacturer', component.manufacturer);
        setValue('modelName', component.modelName);
        
        // 解析specs字符串为对象，添加错误处理
        let specsObj;
        try {
            specsObj = JSON.parse(component.specs as string);
        } catch (error) {
            console.error('Failed to parse specs JSON:', error);
            specsObj = {}; // 解析失败时使用空对象
        }
        
        // 设置specs对象的各个字段
        Object.entries(specsObj).forEach(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
                Object.entries(value as Record<string, any>).forEach(([subKey, subValue]) => {
                    setValue(`specs.${key}.${subKey}`, subValue);
                });
            } else {
                setValue(`specs.${key}`, value);
            }
        });
        
        setValue('msrp', component.msrp);
        setValue('imageUrl', component.imageUrl || '');
        setIsDialogOpen(true);
    } catch (error) {
        console.error('Error in handleEdit:', error);
        // 可以添加错误提示
        // message.error('编辑失败，请重试');
    }
};

  const handleAdd = () => {
    setIsEditMode(false);
    setSelectedComponent(null);
    reset();
    setIsDialogOpen(true);
  };

  const componentTypes: ComponentType[] = ['case', 'cooler', 'cpu', 'gpu', 'motherboard', 'psu', 'ram', 'storage'];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div className="space-x-2">
          {componentTypes.map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              onClick={() => setSelectedType(type)}
            >
              {type.toUpperCase()}
            </Button>
          ))}
        </div>
        <Button onClick={handleAdd}>Add New Component</Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit' : 'Add'} Component</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Manufacturer</Label>
              <Input {...register('manufacturer')} required />
            </div>
            <div>
              <Label>Model Name</Label>
              <Input {...register('modelName')} required />
            </div>
            <div>
              <Label>Specifications</Label>
              <AdminForm register={register} type={selectedType} />
            </div>
            <div>
              <Label>MSRP</Label>
              <Input {...register('msrp')} type="number" step="0.01" required />
            </div>
            <div>
              <Label>Image URL</Label>
              <Input {...register('imageUrl')} />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditMode ? 'Update' : 'Add'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Manufacturer</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>MSRP</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {components.map((component) => (
            <TableRow key={component.id}>
              <TableCell>{component.id}</TableCell>
              <TableCell>{component.manufacturer}</TableCell>
              <TableCell>{component.modelName}</TableCell>
              <TableCell>${component.msrp}</TableCell>
              <TableCell className="space-x-2">
                <Button variant="outline" onClick={() => handleEdit(component)}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(component.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}