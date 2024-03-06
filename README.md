# Adelfi-Velo
Selection of source code from the Adelfi website: [https://www.adelfi.shop](url). Not yet in production.

The frontend consists of simple javascript that uses local and session storage to dynamically change the site's header, which is shared across pages. Backend code implements a batch processing technique to prevent race conditions and ensure data consistency when multiple client sessions attempt to write the same org's db at once.
