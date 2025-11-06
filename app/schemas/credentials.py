from pydantic import BaseModel, ConfigDict, Field


class CredentialsFormSchema(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    auth_token: str = Field(..., validation_alias='AUTH_ID')
    refresh_token: str = Field(..., validation_alias='REFRESH_ID')


class BitrixClientSchema(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    client_id: str = Field(...)
    client_secret: str = Field(...)


class CredentialSchema(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    
    domain: str = Field(...)
    auth_token: str = Field(...)
    refresh_token: str = Field(...)


class PlacementOptionsSchema(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str = Field(..., validation_alias='ID')


class CredentialsFormSchema(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    auth_token: str = Field(..., validation_alias='AUTH_ID')
    auth_expires: str = Field(..., validation_alias='AUTH_EXPIRES')
    refresh_id: str = Field(..., validation_alias='REFRESH_ID')
    member_id: str = Field(..., validation_alias='member_id')
    status: str = Field(..., validation_alias='status')
    placement: str = Field(..., validation_alias='PLACEMENT')
    placement: PlacementOptionsSchema = Field(..., validation_alias='PLACEMENT_OPTIONS')
