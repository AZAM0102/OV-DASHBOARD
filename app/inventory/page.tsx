"use client";

import {
  ChevronDown,
  ChevronRight,
  Download,
  Edit3,
  Package,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout";
import { PageHeader } from "@/components/page-header";
import { theDukaanProducts } from "@/lib/the-dukaan-data";
import { goldPearlProducts } from "@/lib/gold-pearl-data";

type InventoryProduct = {
  id: string;
  account: "THE DUKAAN" | "GOLD PEARL";
  brand: string;
  parentSku: string;
  alternateSkus: string[];
  openingStock: number | null;
};
type Account = InventoryProduct["account"];
type ProductForm = Omit<InventoryProduct, "id" | "account">;

const emptyForm: ProductForm = {
  brand: "",
  parentSku: "",
  alternateSkus: [],
  openingStock: null,
};

export default function Inventory() {
  const [products, setProducts] = useState<InventoryProduct[]>([...theDukaanProducts, ...goldPearlProducts]);
  const [account, setAccount] = useState<Account>("THE DUKAAN");
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("All");
  const [stockFilter, setStockFilter] = useState("All Stock");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<TheDukaanProduct | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [alternateInput, setAlternateInput] = useState("");
  const [alternateInputs, setAlternateInputs] = useState<Record<string, string>>({});

  const accountProducts = useMemo(
    () => products.filter((p) => p.account === account),
    [products, account]
  );

  const brands = useMemo(
    () => ["All", ...Array.from(new Set(accountProducts.map((p) => p.brand))).sort()],
    [accountProducts]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const haystack = [p.brand, p.parentSku, ...p.alternateSkus].join(" ").toLowerCase();
      const stockMatches =
        stockFilter === "All Stock" ||
        (stockFilter === "Not Supplied" && p.openingStock === null) ||
        (stockFilter === "In Stock" && p.openingStock !== null && p.openingStock > 0) ||
        (stockFilter === "Out of Stock" && p.openingStock === 0);

      return (
        p.account === account &&
        (!q || haystack.includes(q)) &&
        (brand === "All" || p.brand === brand) &&
        stockMatches
      );
    });
  }, [products, query, brand, stockFilter]);

  const alternateCount = useMemo(
    () => accountProducts.reduce((sum, p) => sum + p.alternateSkus.length, 0),
    [accountProducts]
  );

  const skuCount = useMemo(
    () => accountProducts.reduce((sum, p) => sum + (p.parentSku ? 1 : 0) + p.alternateSkus.length, 0),
    [accountProducts]
  );

  function toggleExpanded(id: string) {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function openAdd() {
    setEditing(null);
    setForm({ ...emptyForm, alternateSkus: [] });
    setAlternateInput("");
    setShowModal(true);
  }

  function openEdit(product: TheDukaanProduct) {
    setEditing(product);
    setForm({
      brand: product.brand,
      parentSku: product.parentSku,
      alternateSkus: [...product.alternateSkus],
      openingStock: product.openingStock,
    });
    setAlternateInput("");
    setShowModal(true);
  }

  function addAlternateSku() {
    const value = alternateInput.trim();
    if (!value || form.alternateSkus.includes(value)) return;
    setForm((current) => ({
      ...current,
      alternateSkus: [...current.alternateSkus, value],
    }));
    setAlternateInput("");
  }

  function removeAlternateSku(sku: string) {
    setForm((current) => ({
      ...current,
      alternateSkus: current.alternateSkus.filter((item) => item !== sku),
    }));
  }

  function saveProduct() {
    const cleanParent = form.parentSku;
    if (!form.brand.trim() || !cleanParent.trim()) return;

    if (editing) {
      setProducts((current) =>
        current.map((p) =>
          p.id === editing.id
            ? {
                ...p,
                brand: form.brand,
                parentSku: cleanParent,
                alternateSkus: form.alternateSkus,
                openingStock: form.openingStock,
              }
            : p
        )
      );
    } else {
      const id = `td-${Date.now()}`;
      setProducts((current) => [
        ...current,
        {
          id,
          account,
          brand: form.brand.trim(),
          parentSku: cleanParent,
          alternateSkus: form.alternateSkus,
          openingStock: form.openingStock,
        },
      ]);
      setExpanded((current) => new Set(current).add(id));
    }

    setShowModal(false);
  }

  function deleteProduct(product: InventoryProduct) {
    const ok = window.confirm(`Delete parent SKU ${product.parentSku || product.brand}?`);
    if (!ok) return;
    setProducts((current) => current.filter((p) => p.id !== product.id));
    setExpanded((current) => {
      const next = new Set(current);
      next.delete(product.id);
      return next;
    });
  }

  function addInlineAlternate(product: InventoryProduct) {
    const value = (alternateInputs[product.id] || "").trim();
    if (!value || product.alternateSkus.includes(value)) return;

    setProducts((current) =>
      current.map((p) =>
        p.id === product.id
          ? { ...p, alternateSkus: [...p.alternateSkus, value] }
          : p
      )
    );
    setAlternateInputs((current) => ({ ...current, [product.id]: "" }));
  }

  function deleteAlternate(product: InventoryProduct, sku: string) {
    setProducts((current) =>
      current.map((p) =>
        p.id === product.id
          ? { ...p, alternateSkus: p.alternateSkus.filter((item) => item !== sku) }
          : p
      )
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-[1600px] p-5 md:p-7">
        <PageHeader
          title="Inventory"
          description={`${account} SKU master with parent SKU and alternate SKU mapping.`}
          action={
            <button
              type="button"
              onClick={openAdd}
              className="flex h-11 items-center gap-2 rounded-xl bg-[#ff7a00] px-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#e96e00]"
            >
              <Plus size={17} /> Add Product
            </button>
          }
        />

        <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat label="Products" value={products.length.toString()} />
          <Stat label="Total SKUs" value={skuCount.toString()} />
          <Stat label="Alternate SKUs" value={alternateCount.toString()} />
          <Stat label="Account" value={account} />
        </div>

        <div className="ov-card overflow-hidden">
          <div className="border-b border-slate-100 p-4">
            <div className="grid gap-2 md:grid-cols-[minmax(220px,1fr)_160px_160px_160px_auto]">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  className="ov-input pl-10"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search parent SKU, alternate SKU, brand..."
                />
              </div>

              <SelectBox
                value={account}
                onChange={(value) => {
                  setAccount(value as Account);
                  setBrand("All");
                  setStockFilter("All Stock");
                  setExpanded(new Set());
                }}
                options={["THE DUKAAN", "GOLD PEARL"]}
              />
              <SelectBox value={brand} onChange={setBrand} options={brands} />
              <SelectBox
                value={stockFilter}
                onChange={setStockFilter}
                options={["All Stock", "In Stock", "Out of Stock", "Not Supplied"]}
              />

              <button
                type="button"
                className="flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <Download size={16} /> Export
              </button>
            </div>
          </div>

          <div className="ov-scroll overflow-x-auto">
            <table className="w-full min-w-[1080px] text-sm">
              <thead className="bg-[#f7f9fc] text-left text-xs font-semibold text-slate-500">
                <tr>
                  <th className="w-16 px-5 py-3" aria-label="Expand" />
                  <th className="px-3 py-3">Brand</th>
                  <th className="px-5 py-3">Parent SKU</th>
                  <th className="px-5 py-3">SKU Count</th>
                  <th className="px-5 py-3">Stock</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((product) => {
                  const isExpanded = expanded.has(product.id);
                  const totalSkus = (product.parentSku ? 1 : 0) + product.alternateSkus.length;

                  return (
                    <ProductRows
                      key={product.id}
                      product={product}
                      isExpanded={isExpanded}
                      totalSkus={totalSkus}
                      alternateInput={alternateInputs[product.id] || ""}
                      onToggle={() => toggleExpanded(product.id)}
                      onEdit={() => openEdit(product)}
                      onDelete={() => deleteProduct(product)}
                      onAlternateInput={(value) =>
                        setAlternateInputs((current) => ({ ...current, [product.id]: value }))
                      }
                      onAddAlternate={() => addInlineAlternate(product)}
                      onDeleteAlternate={(sku) => deleteAlternate(product, sku)}
                    />
                  );
                })}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="p-12 text-center text-sm text-slate-500">
                No SKU mapping found for this account.
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/60 p-4 text-sm text-slate-600">
          <b className="text-[#10284f]">Stock note:</b> the uploaded {account} sheet contains SKU mappings but no numeric stock quantities, so stock is intentionally shown as <b>Not supplied</b>.
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 p-4 backdrop-blur-[2px]">
          <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/70 bg-white shadow-[0_30px_90px_rgba(16,40,79,.22)]">
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-xl font-extrabold text-[#10284f]">
                  {editing ? "Edit SKU Mapping" : "Add Product"}
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  {account} · Parent + alternate SKU management
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <X size={19} />
              </button>
            </div>

            <div className="max-h-[75vh] overflow-y-auto px-6 py-5">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Brand">
                  <input
                    className="ov-input"
                    value={form.brand}
                    onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
                    placeholder="e.g. KILLER"
                  />
                </Field>
                <Field label="Parent SKU">
                  <input
                    className="ov-input"
                    value={form.parentSku}
                    onChange={(e) => setForm((f) => ({ ...f, parentSku: e.target.value }))}
                    placeholder="Parent SKU"
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field label={`Alternate SKUs (${form.alternateSkus.length})`}>
                  <div className="flex gap-2">
                    <input
                      className="ov-input"
                      value={alternateInput}
                      onChange={(e) => setAlternateInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addAlternateSku();
                        }
                      }}
                      placeholder="Enter alternate SKU and press Enter"
                    />
                    <button
                      type="button"
                      onClick={addAlternateSku}
                      className="rounded-xl bg-[#10284f] px-4 text-sm font-bold text-white transition hover:bg-[#193c72]"
                    >
                      Add
                    </button>
                  </div>
                </Field>

                <div className="mt-3 flex flex-wrap gap-2">
                  {form.alternateSkus.map((sku) => (
                    <button
                      key={sku}
                      type="button"
                      onClick={() => removeAlternateSku(sku)}
                      className="group rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-red-50 hover:text-red-600"
                      title="Remove SKU"
                    >
                      {sku} <span className="ml-1 opacity-50 group-hover:opacity-100">×</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 px-6 py-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveProduct}
                className="rounded-xl bg-[#ff7a00] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#e96e00]"
              >
                {editing ? "Save Changes" : "Create Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}

function ProductRows({
  product,
  isExpanded,
  totalSkus,
  alternateInput,
  onToggle,
  onEdit,
  onDelete,
  onAlternateInput,
  onAddAlternate,
  onDeleteAlternate,
}: {
  product: InventoryProduct;
  isExpanded: boolean;
  totalSkus: number;
  alternateInput: string;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onAlternateInput: (value: string) => void;
  onAddAlternate: () => void;
  onDeleteAlternate: (sku: string) => void;
}) {
  return (
    <>
      <tr className={`border-t border-slate-100 align-middle transition ${isExpanded ? "bg-blue-50/25" : "hover:bg-slate-50/60"}`}>
        <td className="px-5 py-3">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isExpanded}
            aria-label={`${isExpanded ? "Collapse" : "Expand"} ${product.parentSku || product.brand}`}
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition ${isExpanded ? "border-blue-200 bg-blue-50 text-[#1768d4]" : "border-slate-200 bg-white text-[#10284f] hover:border-blue-200 hover:bg-blue-50"}`}
          >
            {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
        </td>

        <td className="px-3 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#ff7a00]">
              <Package size={19} />
            </span>
            <div className="min-w-0">
              <b className="block truncate text-[#10284f]">{product.brand}</b>
              <span className="block text-xs text-slate-500">THE DUKAAN</span>
            </div>
          </div>
        </td>

        <td className="px-5 py-4">
          {product.parentSku ? (
            <code className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-bold text-[#173f72]">
              {product.parentSku}
            </code>
          ) : (
            <span className="text-xs font-medium text-amber-600">No parent SKU supplied</span>
          )}
        </td>

        <td className="px-5 py-4">
          <b className="text-lg font-extrabold text-[#10284f]">{totalSkus}</b>
          <span className="ml-1 text-xs text-slate-400">SKUs</span>
        </td>

        <td className="px-5 py-4">
          {product.openingStock === null ? (
            <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-500">Not supplied</span>
          ) : (
            <span className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700">{product.openingStock} units</span>
          )}
        </td>

        <td className="px-5 py-4">
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onEdit}
              className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-50"
              aria-label={`Edit ${product.parentSku || product.brand}`}
            >
              <Edit3 size={15} />
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="rounded-xl border border-red-100 bg-white p-2 text-red-500 transition hover:bg-red-50"
              aria-label={`Delete ${product.parentSku || product.brand}`}
            >
              <Trash2 size={15} />
            </button>
          </div>
        </td>
      </tr>

      {isExpanded && (
        <tr>
          <td colSpan={6} className="bg-white px-5 pb-5 pt-1">
            <div className="relative ml-4 overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-[0_12px_35px_rgba(16,40,79,.09)] ring-1 ring-blue-50">
              <div className="absolute -top-2 left-6 h-4 w-4 rotate-45 border-l border-t border-blue-100 bg-white" />

              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-[#1768d4]">
                      <Package size={14} />
                    </span>
                    <h3 className="text-sm font-extrabold text-[#10284f]">
                      Alternate SKUs ({product.alternateSkus.length})
                    </h3>
                  </div>
                  <p className="mt-1 pl-9 text-xs text-slate-500">
                    All alternate SKUs mapped to this parent SKU
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1.5 sm:flex">
                    <input
                      value={alternateInput}
                      onChange={(e) => onAlternateInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          onAddAlternate();
                        }
                      }}
                      placeholder="Add alternate SKU..."
                      className="h-8 w-48 bg-transparent px-2 text-xs font-medium outline-none"
                    />
                    <button
                      type="button"
                      onClick={onAddAlternate}
                      className="flex h-8 items-center gap-1.5 rounded-lg bg-[#10284f] px-3 text-xs font-bold text-white transition hover:bg-[#193c72]"
                    >
                      <Plus size={13} /> Add
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-3 sm:hidden">
                <div className="flex gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1.5">
                  <input
                    value={alternateInput}
                    onChange={(e) => onAlternateInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        onAddAlternate();
                      }
                    }}
                    placeholder="Add alternate SKU..."
                    className="min-w-0 flex-1 bg-transparent px-2 text-xs outline-none"
                  />
                  <button
                    type="button"
                    onClick={onAddAlternate}
                    className="flex items-center gap-1 rounded-lg bg-[#10284f] px-3 py-2 text-xs font-bold text-white"
                  >
                    <Plus size={13} /> Add
                  </button>
                </div>
              </div>

              <div className="px-3 pb-3">
                <div className="overflow-hidden rounded-xl border border-slate-100">
                  <table className="w-full text-xs">
                    <thead className="bg-[#f7f9fc] text-left font-semibold text-slate-500">
                      <tr>
                        <th className="w-14 px-4 py-3">#</th>
                        <th className="px-4 py-3">Alternate SKU</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Stock</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.alternateSkus.map((sku, index) => (
                        <tr key={`${sku}-${index}`} className="border-t border-slate-100 hover:bg-slate-50/70">
                          <td className="px-4 py-3 font-semibold text-slate-400">{index + 1}</td>
                          <td className="px-4 py-3">
                            <code className="font-bold text-[#173f72]">{sku}</code>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="rounded-lg bg-slate-100 px-2 py-1 font-medium text-slate-500">Not supplied</span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={onEdit}
                                className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50"
                                aria-label={`Edit alternate SKU ${sku}`}
                              >
                                <Edit3 size={14} />
                              </button>
                              <button
                                type="button"
                                onClick={() => onDeleteAlternate(sku)}
                                className="rounded-lg border border-red-100 p-2 text-red-500 transition hover:bg-red-50"
                                aria-label={`Delete alternate SKU ${sku}`}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {product.alternateSkus.length === 0 && (
                    <div className="p-8 text-center text-xs text-slate-500">
                      No alternate SKUs mapped yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function SelectBox({ value, onChange, options }: { value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <label className="relative block">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-9 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-300"
      >
        {options.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="ov-card p-4">
      <span className="text-xs text-slate-500">{label}</span>
      <b className="mt-1 block truncate text-xl text-[#10284f]">{value}</b>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-600">{label}</span>
      {children}
    </label>
  );
}
