import type {StructureBuilder} from 'sanity/structure'

const releases = (S: StructureBuilder, title: string, filter: string) =>
  S.documentList()
    .title(title)
    .schemaType('release')
    .filter(filter)
    .defaultOrdering([{field: 'releaseAt', direction: 'desc'}])

const singleton = (S: StructureBuilder, title: string, schemaType: string, documentId: string) =>
  S.listItem()
    .title(title)
    .schemaType(schemaType)
    .child(S.document().title(title).schemaType(schemaType).documentId(documentId))

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Ay Din CMS')
    .items([
      S.listItem()
        .title('Main website')
        .child(
          S.list()
            .title('Main website')
            .items([singleton(S, 'Website settings', 'mainSiteSettings', 'mainSiteSettings')]),
        ),
      S.listItem()
        .title('Archive')
        .child(
          S.list()
            .title('Archive')
            .items([
              singleton(S, 'Archive settings', 'archiveSettings', 'archiveSettings'),
              S.divider(),
              S.listItem()
                .title('Releases')
                .schemaType('release')
                .child(
                  S.list()
                    .title('Releases')
                    .items([
                      S.listItem()
                        .title('Scheduled')
                        .child(
                          releases(
                            S,
                            'Scheduled releases',
                            '_type == "release" && visibility == "scheduled"',
                          ),
                        ),
                      S.listItem()
                        .title('Public')
                        .child(
                          releases(
                            S,
                            'Public releases',
                            '_type == "release" && visibility == "public"',
                          ),
                        ),
                      S.listItem()
                        .title('Hidden')
                        .child(
                          releases(
                            S,
                            'Hidden releases',
                            '_type == "release" && visibility == "hidden"',
                          ),
                        ),
                      S.documentTypeListItem('release').title('All releases'),
                    ]),
                ),
              S.documentTypeListItem('link').title('Archive links'),
            ]),
        ),
    ])
