import { ItemListPage } from './item/list/item-list';
import { SettingsPage } from './settings/settings';
import { TabsPage } from './tabs/tabs';
import { TutorialPage } from './tutorial/tutorial';
import { WelcomePage } from './welcome/welcome';

// The page the user lands on after opening the app and without a session
export const FirstRunPage = WelcomePage;//TutorialPage;

// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
export const MainPage = ItemListPage;

// The initial root pages for our tabs (remove if not using tabs)
export const Tab1Root = ItemListPage;
export const Tab2Root = ItemListPage;
export const Tab3Root = SettingsPage;
