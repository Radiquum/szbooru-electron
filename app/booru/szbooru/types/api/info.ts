// Generated by https://quicktype.io

export interface SZ_TYPE_Info {
    postCount:  number;
    diskUsage:  number;
    serverTime: Date;
    config:     Config;
}

interface Config {
    name:                 string;
    userNameRegex:        string;
    passwordRegex:        string;
    tagNameRegex:         string;
    tagCategoryNameRegex: string;
    defaultUserRank:      DefaultUserRank;
    enableSafety:         boolean;
    contactEmail:         null;
    canSendMails:         boolean;
    privileges:           { [key: string]: DefaultUserRank };
}

enum DefaultUserRank {
    Administrator = "administrator",
    Moderator = "moderator",
    Power = "power",
    Regular = "regular",
}