import { CommerceLayerClient } from "@commercelayer/sdk"

import { retryCall } from "./retryCall"

export const getOrganizationsDetails = async ({
  client,
}: {
  client: CommerceLayerClient
}) => retryCall(() => getAsyncOrganization(client))

const getAsyncOrganization = async (client: CommerceLayerClient) => {
  return await client.organization.retrieve({
    fields: {
      organizations: [
        "id",
        "logo_url",
        "name",
        "primary_color",
        "favicon_url",
        "gtm_id",
        "gtm_id_test",
        "support_email",
        "support_phone",
      ],
    },
  })
}
