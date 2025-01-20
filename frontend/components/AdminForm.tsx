// components/ComponentForm.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  type: 'case' | 'cooler' | 'cpu' | 'gpu' | 'motherboard' | 'psu' | 'ram' | 'storage';
}

export function AdminForm({ register, type }: FormProps) {
  switch (type) {
    case 'case':
      return (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Width (mm)</Label>
            <Input {...register('specs.dimensions.width')} type="number" />
          </div>
          <div>
            <Label>Height (mm)</Label>
            <Input {...register('specs.dimensions.height')} type="number" />
          </div>
          <div>
            <Label>Depth (mm)</Label>
            <Input {...register('specs.dimensions.depth')} type="number" />
          </div>
          <div>
            <Label>Max GPU Length (mm)</Label>
            <Input {...register('specs.max_gpu_length')} type="number" />
          </div>
          <div>
            <Label>Max CPU Cooler Height (mm)</Label>
            <Input {...register('specs.max_cpu_cooler')} type="number" />
          </div>
          <div>
            <Label>120mm Fan Support</Label>
            <Input {...register('specs.fan_support.120mm')} type="number" />
          </div>
          <div>
            <Label>140mm Fan Support</Label>
            <Input {...register('specs.fan_support.140mm')} type="number" />
          </div>
          <div>
            <Label>Included Fans</Label>
            <Input {...register('specs.included_fans')} type="number" />
          </div>
        </div>
      );

    case 'cooler':
      return (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Type</Label>
            <Input {...register('specs.type')} />
          </div>
          <div>
            <Label>Min Fan Speed (RPM)</Label>
            <Input {...register('specs.fan_speed.min')} type="number" />
          </div>
          <div>
            <Label>Max Fan Speed (RPM)</Label>
            <Input {...register('specs.fan_speed.max')} type="number" />
          </div>
          <div>
            <Label>TDP Rating (W)</Label>
            <Input {...register('specs.tdp_rating')} type="number" />
          </div>
          <div>
            <Label>Width (mm)</Label>
            <Input {...register('specs.dimensions.width')} type="number" />
          </div>
          <div>
            <Label>Height (mm)</Label>
            <Input {...register('specs.dimensions.height')} type="number" />
          </div>
          <div>
            <Label>Depth (mm)</Label>
            <Input {...register('specs.dimensions.depth')} type="number" />
          </div>
        </div>
      );

    case 'cpu':
      return (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Socket</Label>
            <Input {...register('specs.socket')} />
          </div>
          <div>
            <Label>Cores</Label>
            <Input {...register('specs.cores')} type="number" />
          </div>
          <div>
            <Label>Threads</Label>
            <Input {...register('specs.threads')} type="number" />
          </div>
          <div>
            <Label>Base Clock (GHz)</Label>
            <Input {...register('specs.base_clock')} type="number" step="0.1" />
          </div>
          <div>
            <Label>Boost Clock (GHz)</Label>
            <Input {...register('specs.boost_clock')} type="number" step="0.1" />
          </div>
          <div>
            <Label>TDP (W)</Label>
            <Input {...register('specs.tdp')} type="number" />
          </div>
          <div>
            <Label>L3 Cache (MB)</Label>
            <Input {...register('specs.cache_l3')} type="number" />
          </div>
          <div>
            <Label>PCIe Version</Label>
            <Input {...register('specs.pcie_version')} />
          </div>
        </div>
      );

    case 'gpu':
      return (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>GPU Model</Label>
            <Input {...register('specs.gpu')} />
          </div>
          <div>
            <Label>Memory Size (GB)</Label>
            <Input {...register('specs.memory.size')} type="number" />
          </div>
          <div>
            <Label>Memory Type</Label>
            <Input {...register('specs.memory.type')} />
          </div>
          <div>
            <Label>Memory Bus Width</Label>
            <Input {...register('specs.memory.bus_width')} type="number" />
          </div>
          <div>
            <Label>Base Clock (MHz)</Label>
            <Input {...register('specs.base_clock')} type="number" />
          </div>
          <div>
            <Label>Boost Clock (MHz)</Label>
            <Input {...register('specs.boost_clock')} type="number" />
          </div>
          <div>
            <Label>Length (mm)</Label>
            <Input {...register('specs.length')} type="number" />
          </div>
          <div>
            <Label>TDP (W)</Label>
            <Input {...register('specs.tdp')} type="number" />
          </div>
        </div>
      );

    case 'motherboard':
      return (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Socket</Label>
            <Input {...register('specs.socket')} />
          </div>
          <div>
            <Label>Chipset</Label>
            <Input {...register('specs.chipset')} />
          </div>
          <div>
            <Label>Form Factor</Label>
            <Input {...register('specs.form_factor')} />
          </div>
          <div>
            <Label>Memory Type</Label>
            <Input {...register('specs.memory.type')} />
          </div>
          <div>
            <Label>Memory Slots</Label>
            <Input {...register('specs.memory.slots')} type="number" />
          </div>
          <div>
            <Label>Max Memory (GB)</Label>
            <Input {...register('specs.memory.max_capacity')} type="number" />
          </div>
          <div>
            <Label>PCIe x16 Slots</Label>
            <Input {...register('specs.pcie.x16_slots')} type="number" />
          </div>
          <div>
            <Label>PCIe x4 Slots</Label>
            <Input {...register('specs.pcie.x4_slots')} type="number" />
          </div>
          <div>
            <Label>PCIe x1 Slots</Label>
            <Input {...register('specs.pcie.x1_slots')} type="number" />
          </div>
        </div>
      );

    case 'psu':
      return (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Wattage</Label>
            <Input {...register('specs.wattage')} type="number" />
          </div>
          <div>
            <Label>Modular Type</Label>
            <Input {...register('specs.modular')} />
          </div>
          <div>
            <Label>Efficiency Rating</Label>
            <Input {...register('specs.efficiency')} />
          </div>
          <div>
            <Label>Fan Size (mm)</Label>
            <Input {...register('specs.fan_size')} type="number" />
          </div>
          <div>
            <Label>EPS Connectors</Label>
            <Input {...register('specs.connectors.eps')} type="number" />
          </div>
          <div>
            <Label>PCIe Connectors</Label>
            <Input {...register('specs.connectors.pcie')} type="number" />
          </div>
          <div>
            <Label>SATA Connectors</Label>
            <Input {...register('specs.connectors.sata')} type="number" />
          </div>
        </div>
      );

    case 'ram':
      return (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Type</Label>
            <Input {...register('specs.type')} />
          </div>
          <div>
            <Label>Speed (MHz)</Label>
            <Input {...register('specs.speed')} type="number" />
          </div>
          <div>
            <Label>Capacity (GB)</Label>
            <Input {...register('specs.capacity')} type="number" />
          </div>
          <div>
            <Label>Number of Modules</Label>
            <Input {...register('specs.modules')} type="number" />
          </div>
          <div>
            <Label>Timings</Label>
            <Input {...register('specs.timings')} />
          </div>
          <div>
            <Label>Voltage</Label>
            <Input {...register('specs.voltage')} type="number" step="0.1" />
          </div>
        </div>
      );

    case 'storage':
      return (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Type</Label>
            <Input {...register('specs.type')} />
          </div>
          <div>
            <Label>Capacity (GB)</Label>
            <Input {...register('specs.capacity')} type="number" />
          </div>
          <div>
            <Label>Interface</Label>
            <Input {...register('specs.interface')} />
          </div>
          <div>
            <Label>Form Factor</Label>
            <Input {...register('specs.form_factor')} />
          </div>
          <div>
            <Label>Read Speed (MB/s)</Label>
            <Input {...register('specs.read_speed')} type="number" />
          </div>
          <div>
            <Label>Write Speed (MB/s)</Label>
            <Input {...register('specs.write_speed')} type="number" />
          </div>
          <div>
            <Label>TBW</Label>
            <Input {...register('specs.tbw')} type="number" />
          </div>
        </div>
      );
  }
}