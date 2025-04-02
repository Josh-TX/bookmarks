// utils/bookmarks.ts
export interface BookmarkNode {
  id: string;
  parentId?: string;
  title: string;
  url?: string;
  children?: BookmarkNode[];
  dateAdded?: number;
}

export class BookmarkService {
  private static instance: BookmarkService;
  private hasBookmarksAPI: boolean;

  private constructor() {
    // Check if Chrome bookmarks API is available
    this.hasBookmarksAPI = !!(
      window.chrome && 
      chrome.bookmarks && 
      typeof chrome.bookmarks.getTree === 'function'
    );
  }

  public static getInstance(): BookmarkService {
    if (!BookmarkService.instance) {
      BookmarkService.instance = new BookmarkService();
    }
    return BookmarkService.instance;
  }

  public isSupported(): boolean {
    return this.hasBookmarksAPI;
  }

  public async getBookmarks(): Promise<BookmarkNode[]> {
    if (!this.hasBookmarksAPI) {
      return Promise.resolve([]);
    }

    return new Promise((resolve) => {
      chrome.bookmarks.getTree((results) => {
        resolve(results);
      });
    });
  }

  // Add more methods as needed for your specific requirements
}