import { DatePicker } from "./datePicker";

export default function FromToDatePicker() {
  return (
    <section className="flex gap-4">
      <DatePicker title="From" />
      <DatePicker title="To" />
    </section>
  );
}
