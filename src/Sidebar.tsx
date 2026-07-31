// shows root folders in fs or whatever
import { createResource, For, Show } from "solid-js";
import { fs } from "./fs.js";
import Entry from "./Entry.jsx";

async function loadRootFolders() {
    const paths = await fs.readdir("/");
    const folders = [];
    for (const path of paths) {
        if (await fs.isDirectory(path)) {
            const ts = await fs.getTimestamps(path);
            folders.push({
                path,
                name: path.split("/").pop(),
                timestamp: ts ? new Date(ts.modifiedAt).toLocaleString() : "",
            });
        }
    }
    return folders;
}

export default function Sidebar(props: any) {
    const [folders] = createResource(loadRootFolders);

    return <div>
        <Show when={!folders.error} fallback={<div id="name">failed to load</div>}>
            <For each={folders()}>
                {(folder) => (
                    <Entry
                        type="dir"
                        name={folder.name}
                        timestamp={folder.timestamp}
                        onClick={() => props.onSelect(folder.path)}
                    ></Entry>
                )}
            </For>
        </Show>
    </div>
}