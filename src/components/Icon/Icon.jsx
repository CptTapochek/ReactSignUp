import React from "react";

import { ReactComponent as ArrowDown } from "../../assets/icons/arrow-down.svg";
import { ReactComponent as BarChart } from "../../assets/icons/bar-chart.svg";
import { ReactComponent as LineChart } from "../../assets/icons/line-chart.svg";
import { ReactComponent as Bell } from "../../assets/icons/bell.svg";
import { ReactComponent as Calendar } from "../../assets/icons/calendar-small.svg";
import { ReactComponent as Chat } from "../../assets/icons/chat.svg";
import { ReactComponent as Clock } from "../../assets/icons/clock.svg";
import { ReactComponent as CogDark } from "../../assets/icons/cog-dark.svg";
import { ReactComponent as CogLight } from "../../assets/icons/cog-light.svg";
import { ReactComponent as CloudBig } from "../../assets/icons/cloud-big.svg";
import { ReactComponent as Dashboard } from "../../assets/icons/dashboard.svg";
import { ReactComponent as Dropdown } from "../../assets/icons/dropdown.svg";
import { ReactComponent as Filters } from "../../assets/icons/filters.svg";
import { ReactComponent as FileDark } from "../../assets/icons/file-dark.svg";
import { ReactComponent as FolderDark } from "../../assets/icons/folder-dark.svg";
import { ReactComponent as FolderLight } from "../../assets/icons/folder-light.svg";
import { ReactComponent as Helmet } from "../../assets/icons/helmet.svg";
import { ReactComponent as Logout } from "../../assets/icons/logout.svg";
import { ReactComponent as Marketplace } from "../../assets/icons/marketplace.svg";
import { ReactComponent as Options } from "../../assets/icons/options.svg";
import { ReactComponent as Overview } from "../../assets/icons/overview.svg";
import { ReactComponent as PlusWhite } from "../../assets/icons/plus-white.svg";
import { ReactComponent as Search } from "../../assets/icons/search-small.svg";
import { ReactComponent as StartEmpty } from "../../assets/icons/star-empty.svg";
import { ReactComponent as User } from "../../assets/icons/user.svg";
import { ReactComponent as ArrowsUpDown } from "../../assets/icons/arrows-up-down.svg";
import { ReactComponent as LogoSmall } from "../../assets/icons/logo-small.svg";
import { ReactComponent as LogoBig } from "../../assets/icons/logo-big.svg";
import { ReactComponent as LogoGoogle } from "../../assets/icons/logo-google.svg";
import { ReactComponent as SignupSuccessBig } from "../../assets/icons/signup-success-big.svg";
import { ReactComponent as SignupSuccessSmall } from "../../assets/icons/signup-success-small.svg";
import { ReactComponent as UploadCloudDark } from "../../assets/icons/upload-cloud-dark.svg";

export default class Icon extends React.PureComponent {
	render() {
		const { icon } = this.props;

		switch(icon) {
			case "arrow-down": 
				return <ArrowDown />;
			case "bar-chart": 
				return <BarChart />;
			case "line-chart":
				return <LineChart />;
			case "bell": 
				return <Bell />;
			case "calendar": 
				return <Calendar />;
			case "chat": 
				return <Chat />;
			case "clock": 
				return <Clock />;
			case "cog-dark": 
				return <CogDark />;
			case "cog-light": 
				return <CogLight />;
			case "dashboard": 
				return <Dashboard />;
			case "dropdown": 
				return <Dropdown />;
			case "filters": 
				return <Filters />;
			case "file-dark": 
				return <FileDark />;
			case "folder-dark": 
				return <FolderDark />;
			case "folder-light": 
				return <FolderLight />;
			case "helmet": 
				return <Helmet />;
			case "logout": 
				return <Logout />;
			case "marketplace": 
				return <Marketplace />;
			case "options": 
				return <Options />;
			case "overview": 
				return <Overview />;
			case "plus": 
				return <PlusWhite />;
			case "search": 
				return <Search />;
			case "star-empty": 
				return <StartEmpty />;
			case "user": 
				return <User />;
			case "arrows-up-down": 
				return <ArrowsUpDown />;
			case "logo-small": 
				return <LogoSmall />;
			case "logo-big": 
				return <LogoBig />;
			case "logo-google": 
				return <LogoGoogle />;
			case "signup-success-big": 
				return <SignupSuccessBig />;
			case "signup-success-small": 
				return <SignupSuccessSmall />;
			case "cloud-big": 
				return <CloudBig />;
			case "upload-cloud-dark": 
				return <UploadCloudDark />;
			default: 
				return null;
		}
	}
}
