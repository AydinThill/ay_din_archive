import type {StructureBuilder} from 'sanity/structure'

const releases = (S: StructureBuilder, title: string, filter: string) =>
  S.documentList()
    .title(title)
    .schemaType('release')
    .filter(filter)
    .defaultOrdering([{field: 'releaseAt', direction: 'desc'}])

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site settings')
        .schemaType('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
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
                  releases(S, 'Public releases', '_type == "release" && visibility == "public"'),
                ),
              S.listItem()
                .title('Hidden')
                .child(
                  releases(S, 'Hidden releases', '_type == "release" && visibility == "hidden"'),
                ),
              S.documentTypeListItem('release').title('All releases'),
            ]),
        ),
      S.documentTypeListItem('track').title('Track library'),
      S.documentTypeListItem('link').title('Links'),
    ])
