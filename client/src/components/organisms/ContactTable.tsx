import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/hooks";
import useContactDealStore from "@/store/contacts-deals";
import { cn } from "@/lib/utils";
import LinkButton from "../atoms/LinkButton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LuLoader } from "react-icons/lu";

// Type definitions
type ContactProperties = {
  createdate: string;
  email: string;
  firstname: string;
  hs_object_id: string;
  lastmodifieddate: string;
  lastname: string;
  phone: string | null;
  company: string | null;
  website: string | null;
  lifecyclestage: string | null;
};

type Contact = {
  id: string;
  properties: ContactProperties;
  created_at: string;
  updated_at: string;
  archived: boolean;
};

type ContactsResponse = {
  contacts: Contact[];
};

// Fetch contacts function
const fetchContacts = async (token: string): Promise<Contact[]> => {
  const response = await axios.get<ContactsResponse>(
    "http://127.0.0.1:4040/api/private/crm/contacts/",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.contacts;
};

const ContactTable = () => {
  const { email, deal_id, setContactDeal } = useContactDealStore();
  const { token } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");

  // React Query to fetch contacts
  const {
    data: contacts = [],
    isLoading,
    error,
  } = useQuery<Contact[]>({
    queryKey: ["contacts", token],
    queryFn: () => fetchContacts(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Filtering contacts
  const filteredContacts = contacts.filter((contact) =>
    [
      contact.properties.firstname?.toLowerCase(),
      contact.properties.lastname?.toLowerCase(),
      contact.properties.email?.toLowerCase(),
    ].some((field) => field?.includes(searchTerm.toLowerCase()))
  );

  // Contact selection handler
  const onSelect = (contactEmail: string) => {
    setContactDeal(contactEmail, deal_id);
  };

  // Loading state
  if (isLoading) {
    return (
      <Card className="flex items-center justify-center h-[500px]">
        <LuLoader className="size-10 animate-spin text-primary" />
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className="flex items-center justify-center h-[500px] text-destructive">
        Failed to load contacts. Please try again later.
      </Card>
    );
  }

  return (
    <Card className="shadow-none size-full">
      <CardHeader>
        <CardTitle>Contacts</CardTitle>
        <CardDescription>
          Manage your contacts efficiently with our CRM. Keep track of all your
          interactions and stay organized with HubSpot integration.
        </CardDescription>

        <div className="w-full pt-4 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Filter contacts"
              className="shadow-none h-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              size={"sm"}
              className={"flex items-center gap-2 border-dashed"}
              variant={"outline"}
            >
              <span>Status</span>
            </Button>
            <Button
              size={"sm"}
              className={"flex items-center gap-2 border-dashed"}
              variant={"outline"}
            >
              <span>Priority</span>
            </Button>
          </div>
          <LinkButton>
            <span>Link a deal</span>
          </LinkButton>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Lifecycle Stage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow
                className={cn(
                  "cursor-pointer ",
                  email === contact.properties.email &&
                    "bg-secondary border border-dashed "
                )}
                onClick={() => onSelect(contact.properties.email)}
                key={contact.id}
              >
                <TableCell className="font-medium">
                  {contact.properties.email}
                </TableCell>
                <TableCell>{contact.properties.firstname}</TableCell>
                <TableCell>{contact.properties.lastname}</TableCell>
                <TableCell>{contact.properties.phone || "N/A"}</TableCell>
                <TableCell>{contact.properties.company || "N/A"}</TableCell>
                <TableCell>{contact.properties.website || "N/A"}</TableCell>
                <TableCell>
                  {contact.properties.lifecyclestage || "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ContactTable;