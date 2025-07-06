import { CommandDialog, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dispatch, SetStateAction } from "react";

export function DashboardCommand({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Find a meeting or agent" />
        <CommandList>
            <CommandItem>
                test
            </CommandItem>
        </CommandList>
    </CommandDialog>
  )
}