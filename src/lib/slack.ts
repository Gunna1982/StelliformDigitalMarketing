interface SlackLeadNotification {
  name: string;
  email: string;
  project?: string;
  message?: string;
  leadId: string;
}

interface SlackBlock {
  type: string;
  text?: {
    type: string;
    text: string;
    emoji?: boolean;
  };
  fields?: Array<{
    type: string;
    text: string;
  }>;
  elements?: Array<{
    type: string;
    text: string;
  }>;
}

export async function notifySlackNewLead(lead: SlackLeadNotification): Promise<void> {
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!slackWebhookUrl) {
    console.warn('[SLACK] SLACK_WEBHOOK_URL not configured - skipping notification');
    return;
  }

  const timestamp = new Date().toISOString();

  try {
    const blocks: SlackBlock[] = [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'New Lead from Stelliform Digital',
          emoji: true
        }
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Name:*\n${lead.name}` },
          { type: 'mrkdwn', text: `*Email:*\n${lead.email}` }
        ]
      }
    ];

    if (lead.project) {
      blocks.push({
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Project/Budget:*\n${lead.project}` }
        ]
      });
    }

    if (lead.message) {
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Message:*\n${lead.message}`
        }
      });
    }

    blocks.push({
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `Lead ID: ${lead.leadId} | Received: ${timestamp}`
        }
      ]
    });

    const response = await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blocks })
    });

    if (!response.ok) {
      throw new Error(`Slack responded with status ${response.status}`);
    }

    console.log(`[SLACK] Lead notification sent successfully for ${lead.leadId}`);
  } catch (error) {
    console.error('[SLACK] Failed to send notification:', error);
    // Don't throw - we don't want to fail the lead submission if Slack fails
  }
}
