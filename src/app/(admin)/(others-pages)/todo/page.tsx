import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import TodoTable from "@/components/tables/TodoTable";
import { Metadata } from "next";
import Button from "@/components/ui/button/Button";

export const metadata: Metadata = {
  title: "Next.js Basic Table | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};

export default function BasicTables() {
  return (
    <div>
        <div>
            <PageBreadcrumb pageTitle="Trabalhos a fazer" />
     
        </div>
   
      <div className="space-y-6">
        <ComponentCard title="">
          <TodoTable/>
        </ComponentCard>
      </div>
    </div>
  );
}
