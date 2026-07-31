import { createResource, For, Show } from "solid-js";
import { fs } from "./fs.js";
import { editor } from "./editor.js";
import Entry from "./Entry.jsx";

async function loadEntries(path: string) {
    const children = await fs.readdir(path);
    const entries = [];
    for (const child of children) {
        const [isDir, ts] = await Promise.all([fs.isDirectory(child), fs.getTimestamps(child)]);
        entries.push({
            path: child,
            name: child.split("/").pop(),
            type: isDir ? "dir" : "file",
            timestamp: ts ? new Date(ts.modifiedAt).toLocaleString() : "",
        });
    }
    return entries;
}

export default function Content(props: any) {
    const [entries] = createResource(() => [props.path, props.refresh], ([path]) => loadEntries(path));

    function onEntryClick(entry: any) {
        if (entry.type === "dir") {
            props.onNavigate(entry.path);
        } else if (entry.name.toLowerCase().endsWith(".txt")) {
            editor.editFile(entry.path);
        }
    }

    return <div>
        <Show when={!entries.error} fallback={<div id="name">failed to load</div>}>
            <For each={entries()}>
                {(entry) => (
                    <Entry
                        type={entry.type}
                        name={entry.name}
                        timestamp={entry.timestamp}
                        onClick={() => onEntryClick(entry)}
                    ></Entry>
                )}
            </For>
        </Show>
    </div>
}
