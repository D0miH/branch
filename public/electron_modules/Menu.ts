import { Menu as ElectronMenu, MenuItemConstructorOptions, app } from "electron";

const template: MenuItemConstructorOptions[] = [
    {
        label: "View",
        submenu: [
            { role: "reload" },
            { role: "forcereload" },
            { role: "toggledevtools" },
            { type: "separator" },
            { role: "resetzoom" },
            { role: "zoomin" },
            { role: "zoomout" },
            { type: "separator" },
            { role: "togglefullscreen" }
        ]
    }
];

export default class Menu {
    menu: ElectronMenu;

    constructor() {
        if (this.isDarwin()) {
            this.menu = this.createDarwinMenu();
        } else {
            this.menu = ElectronMenu.buildFromTemplate(template);
        }

        ElectronMenu.setApplicationMenu(this.menu);
    }

    /**
     * Returns true if the os is osx.
     */
    isDarwin() {
        return process.platform === "darwin";
    }

    /**
     * Creates a default menu for osx.
     */
    createDarwinMenu(): ElectronMenu {
        template.unshift({
            label: app.getName(),
            submenu: [
                { role: "about" },
                { type: "separator" },
                { role: "services" },
                { type: "separator" },
                { role: "hide" },
                { role: "hideothers" },
                { role: "unhide" },
                { type: "separator" },
                { role: "quit" }
            ]
        });

        return ElectronMenu.buildFromTemplate(template);
    }
}
