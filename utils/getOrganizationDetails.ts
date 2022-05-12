import { CommerceLayerClient, Organization } from "@commercelayer/sdk"

import { retryCall } from "./retryCall"

export const getOrganizationsDetails = async ({
  client,
}: {
  client: CommerceLayerClient
}) => {
  const apiResponse = await retryCall<Organization>(
    client.organization.retrieve({
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
  )

  return (apiResponse?.success && apiResponse.object) || null
}
